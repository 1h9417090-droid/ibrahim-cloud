import { Handler } from '@netlify/functions'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcrypt'

const mongoURI = 'mongodb+srv://sehx0190_db_user:Sanad$sa19971997@cluster0.yselhek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

let client: MongoClient

async function connectDB() {
  if (!client) {
    client = new MongoClient(mongoURI)
    await client.connect()
  }
  return client.db('accounting_system')
}

export const handler: Handler = async (event) => {
  try {
    const { path, method } = event
    const db = await connectDB()

    // CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Content-Type': 'application/json'
    }

    // Handle preflight requests
    if (method === 'OPTIONS') {
      return {
        statusCode: 200,
        headers,
        body: ''
      }
    }

    // Parse path to determine endpoint
    const cleanPath = path.replace('/.netlify/functions/api', '').replace('/api', '')
    const pathParts = cleanPath.split('/').filter(Boolean)
    const endpoint = pathParts[0] // auth, users, products, etc.
    const action = pathParts[1] // login, user, etc.

    // Auth endpoints
    if (endpoint === 'auth') {
      if (action === 'login' && method === 'POST') {
        const { username, password } = JSON.parse(event.body || '{}')
        
        const user = await db.collection('users').findOne({ username })
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return {
            statusCode: 401,
            headers,
            body: JSON.stringify({ error: 'Invalid credentials' })
          }
        }

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            user: {
              id: user._id,
              username: user.username,
              role: user.role,
              tenantId: user.tenantId
            }
          })
        }
      }

      if (action === 'user' && method === 'GET') {
        // Simple user check - in production you'd verify session/token
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            user: {
              id: 'demo-user',
              username: 'admin',
              role: 'super_admin',
              tenantId: 'demo-tenant'
            }
          })
        }
      }
    }

    // Users endpoints
    if (endpoint === 'users' && method === 'GET') {
      const users = await db.collection('users').find({}).toArray()
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(users)
      }
    }

    // Products endpoints
    if (endpoint === 'products' && method === 'GET') {
      const products = await db.collection('products').find({}).toArray()
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(products)
      }
    }

    // Revenues endpoints
    if (endpoint === 'revenues' && method === 'GET') {
      const revenues = await db.collection('revenues').find({}).toArray()
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(revenues)
      }
    }

    // Expenses endpoints
    if (endpoint === 'expenses' && method === 'GET') {
      const expenses = await db.collection('expenses').find({}).toArray()
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(expenses)
      }
    }

    // Dashboard endpoints
    if (endpoint === 'dashboard' && method === 'GET') {
      const [revenues, expenses, products] = await Promise.all([
        db.collection('revenues').find({}).toArray(),
        db.collection('expenses').find({}).toArray(),
        db.collection('products').find({}).toArray()
      ])
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          revenues,
          expenses,
          products,
          stats: {
            totalRevenue: revenues.reduce((sum, r) => sum + (r.amount || 0), 0),
            totalExpenses: expenses.reduce((sum, e) => sum + (e.amount || 0), 0),
            totalProducts: products.length
          }
        })
      }
    }

    // Default response
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ 
        error: 'Endpoint not found',
        path: path,
        endpoint: endpoint,
        action: action,
        method: method
      })
    }

  } catch (error) {
    console.error('API Error:', error)
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Internal server error' })
    }
  }
}
