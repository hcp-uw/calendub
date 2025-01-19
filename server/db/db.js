// CURRENTLY NOT IN USE - WAS USED FOR TESTING PURPOSES

const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://arjunbalaji08:ohQTIA6gr0pLJRBK@cluster0.mes8j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        console.log('Connecting to MongoDB...');
        await client.connect();
        console.log('Connected to MongoDB');
        const database = client.db('sample_mflix');
        return database;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

module.exports = { connectToDatabase, client };
