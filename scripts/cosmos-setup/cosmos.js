const { CosmosClient } = require('@azure/cosmos');
require('dotenv').config();

const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;

if (!endpoint || !key) {
    throw new Error("Please set COSMOS_ENDPOINT and COSMOS_KEY in your .env file.");
}

const client = new CosmosClient({ endpoint, key });
const databaseId = "CommunicationAppDb";

async function initializeDatabase() {
    try {
        const { database } = await client.databases.createIfNotExists({ id: databaseId });
        console.log(`Database connected: ${database.id}`);

        await database.containers.createIfNotExists({ 
            id: 'messages', 
            partitionKey: { paths: ['/chatRoomId'] } 
        });
        
        await database.containers.createIfNotExists({ 
            id: 'calendarEvents', 
            partitionKey: { paths: ['/userId'] } 
        });

        console.log("Containers 'messages' and 'calendarEvents' created successfully!");
    } catch (error) {
        console.error("Error initializing Cosmos DB:", error);
    }
}

initializeDatabase();