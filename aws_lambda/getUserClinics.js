'use strict';
const AWS = require('aws-sdk');

exports.handler = async(event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();
    
    let responseBody = "";
    let statusCode = 0;
    
    
    
    const params = {
        TableName: "Clinics",
        KeyConditionExpression : "#o = :userName and begins_with(SK, :C)",
        ExpressionAttributeValues : {":userName" : `MANAGEMENT#${event.username}`,
                                        ":C":`CLINIC#`
        },
        ExpressionAttributeNames:{
        "#o": "PK", 
        }

    };

    try {
        const data = await documentClient.query(params).promise();
        // responseBody = JSON.stringify(data.Items);
        responseBody = data.Items;
        statusCode = 200;
        console.log(data);

    } catch(err) {
        responseBody = `Unable to get product: ${err}`;
        statusCode = 404; 
        console.log(err);

    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type":"application/json"
        },
        body: responseBody
    };
    return responseBody;
};