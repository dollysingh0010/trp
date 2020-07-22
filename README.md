# trp

Message-broker POC

Prerequisites 
Install ActiveMQ. Follow below instruction to install

•	Install activemq  
•	Install java 
•	set JAVA_HOME env variable – Ex:- D:\apache-activemq-5.15.13\bin
•	 start ActiveMQ using command “activemq start”  inside bin folder where activemq installed .
•	you can access ActiveMQ server on http://localhost:8161/

Getting started

Clone this repository and navigate into it
Install all dependencies
npm install 
 
Instruction to use 
Sample example and message payload is given in test.js file (src/utilities/messageSrv)

Mandatory field to produce message  - 
message - JSON Object
senderName - String,
ueueName  - String 

Optional field to produce messages -
priority - 0-9 any number,
ttl        :null or time in millisecond,
durable    : Boolean

