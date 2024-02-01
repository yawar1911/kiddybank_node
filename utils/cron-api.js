const { join } = require('path/posix') ;
const logger = require('./logger') 
let axios = require("axios")
let requestBody = require("./request-body")


axios.interceptors.response.use((response) => response, (error) => {
    throw new Error(error.response.data.error.message.value)
});

class AlessaClass {
    constructor(baseUrl, apiUrl, credentials) {
        this.baseUrl = baseUrl;
        this.apiUrl = apiUrl;
        this.credentials = credentials;
    }



    async login (CompanyDB)  {

        //---------------logger---------//
        logger.info(`Login BaseUrl:${this.baseUrl} API URL:${this.apiUrl.login} DATA: ${JSON.stringify({ CompanyDB, UserName: this.credentials.UserName, Password: this.credentials.Password })} `);
        try {
            let response = await axios.post(`${this.baseUrl}${this.apiUrl.login}`, {
                CompanyDB,
                UserName: this.credentials.UserName,
                Password: this.credentials.Password
            })
            logger.info(`Login,RESPONSE: ${JSON.stringify(response.data)} `);

            return response.data
        } catch (error) {
            logger.error(`customerCreate,RESPONSE: ${JSON.stringify(error.message)} `);
        }

    };

     async customerCreate (customer, token, tax) {
        let data = requestBody.parseBussinessPartnerBody(customer, tax);
        try {
            logger.info(`----------------------------------------------customerCreate  One Record Status--Start--------------------------------`);

            logger.info(`customerCreate:BaseUrl:${this.baseUrl}${this.apiUrl.customerCreate}`);
            logger.info(`customerCreate:Body:${JSON.stringify(data)}`);

            let response = await axios.post(`${this.baseUrl}${this.apiUrl.customerCreate}`,
                data
                , {
                    headers: {
                        Cookie: `B1SESSION=${token.token}; ROUTEID=.node8`
                    }
                })

                logger.info(`----------------------------------------------customerVisit  One Record Status--Start--------------------------------`);

                logger.info(`customerCreate:BaseUrl:${this.baseUrl}${this.apiUrl.customerCreate}`);
                logger.info(`customerCreate:Body:${JSON.stringify(data)}`);
                logger.info(`customerCreate:RESPONSE: ${JSON.stringify(response.data)} `);

            if (response.status === 201) {
                return response.data
            }
        } catch (error) {
            logger.error(`customerCreate,Error: ${error} `);
        }

    };

      async customerVisit (customerVisit, token)  {

        let data = requestBody.parseCustomerVisit(customerVisit);
        
        try {
        logger.info(`----------------------------------------------customerVisit  One Record Status--Start--------------------------------`);
        logger.info(`customerVisit:BaseUrl:${this.baseUrl}${this.apiUrl.customerVisit}`);
        logger.info(`customerVisit:Body:${JSON.stringify(data)}`);
            let response = await axios.post(`${this.baseUrl}${this.apiUrl.customerVisit}`,
                data,
                {
                    headers: {
                        Cookie: `B1SESSION=${token.token}; ROUTEID=.node8`
                    }
                }
            )

           
            logger.info(`customerVisit:RESPONSE: ${JSON.stringify(response.data)} `);

            if (response.status === 201) {
                return response.data
            }
        } catch (error) {
            logger.error(`customerVisit Error:${error} `);        }
    };

      async saleQuote (saleOffer, token) {
        let data = requestBody.parseSaleQuote(saleOffer);
        try {

            logger.info(`----------------------------------------------saleQuote  One Record Status--Start--------------------------------`);

            logger.info(`saleQuote:BaseUrl:${this.baseUrl}${this.apiUrl.saleOffer}`);
            logger.info(`saleQuote:Body:${JSON.stringify(data)}`);


            let response = await axios.post(`${this.baseUrl}${this.apiUrl.saleOffer}`,
                data,
                {
                    headers: {
                        Cookie: `B1SESSION=${token.token}; ROUTEID=.node8`
                    }
                }
            )
            logger.info(`saleQuote:RESPONSE: ${JSON.stringify(response.data)} `);

            if (response.status === 201) {
                return response.data;
            }
        } catch (error) {
            logger.error(`saleQuote,Error:${error} `);
        }

    };

     async saleOrder (saleOrder, token, saleOffer)  {
        let data = requestBody.parseSaleOrder(saleOrder, saleOffer);
        try{
            logger.info(`----------------------------------------------saleOrder  One Record Status--Start--------------------------------`);

            logger.info(`saleOrder:BaseUrl:${this.baseUrl}${this.apiUrl.saleOrder}`);
            logger.info(`saleOrder:Body:${JSON.stringify(data)}`);

            let response = await axios.post(`${this.baseUrl}${this.apiUrl.saleOrder}`,
            data,
            {
                headers: {
                    Cookie: `B1SESSION=${token.token}; ROUTEID=.node8`
                }
            }
        )
        logger.info(`saleOrder,RESPONSE: ${JSON.stringify(response.data)} `);
        if (response.status === 201) {
            return response.data;
        }
        }catch(error){
            logger.error(`saleOrder,Error: ${error} `);
        }
      
    }

}
module.exports = AlessaClass;