function parseBussinessPartnerBody(customer, tax) {
    return {
       // Series: customer.branch.series, // branch series
         Series: "76",
        // Series: customer.branch.series,
        AdditionalID: customer._id,
        CardName: customer.name,
        CardForeignName: customer.name_ar,
        // GroupCode: customer.group.code,
        "GroupCode": "116", 
        DebitorAccount: "_SYS00000000629",
        DownPaymentClearAct: "_SYS00000001190",
        // Fax: customer.fax,
        Fax: 966,
        // Cellular: customer.mobile,
         Cellular: 548491501,
        Phone1: customer.Phone,
        Phone2: "",
        EmailAddress: customer.email,
        VatLiable: "Y", // Y is only working
        // VatGroup: (tax || {}).code || "",
        VatGroup: "OA1",

        
        UnifiedFederalTaxID: "",
        //U_latitude: "12.912118",
        //U_longitude: "77.644555",
        //"U_dob": "",
        //"U_gender": "NA",
        BPAddresses: [
            {
                "AddressName": customer.address.address_line_1 || "",
                "Street": customer.address.address_line_2 || "",
                "Block": "",
                "BuildingFloorRoom": "",
                "ZipCode": customer.address.postal_code || "",
                "City": customer.address.city || "",
                // "Country": customer.address.country || ""
                "Country": "IN"

            }
        ]
    }
}

function parseCustomerVisit(customerVisit) {
    let empRefreence = customerVisit.emp_refrence || 'null';
    let remark = customerVisit.remark || 'null';
    let offer_number = customerVisit.offer_number || 'null';
    let offered_amount = customerVisit.offered_amount || '0';
    let how_to_know = customerVisit.how_to_know || 'null'
    let influencer = customerVisit.influencer || 'N/A';
    let building_type = customerVisit.building_type || 'null';
    // let dellivery_time = customerVisit.dellivery_time || '3 Months';
    let dellivery_time ='3 Months';
    let competitor_visit = customerVisit.competitor_visit ? 'Y' : 'N';
    let competitor_name = customerVisit.competitor_name || 'null';
    let not_buying_reason = customerVisit.not_buying_reason || 'null';
    let kitchen_type = customerVisit.kitchen_type || 'Modern Kitchen';
    let kitchen_design = customerVisit.kitchen_design || 'N/A';
    let worktops = customerVisit.worktops || 'N/A';

    let fs = customerVisit.food_storage ? 'Y' : 'N';
    let cs = customerVisit.cookware_storage ? 'Y' : 'N';
    let as = customerVisit.appliances_storage ? 'Y' : 'N';
    let da = customerVisit.dinning_area ? 'Y' : 'N';
//  Series: customerVisit.branch.series,
    return {
        U_Name: customerVisit.name,
        Series: 192,
        U_Mobile: customerVisit.mobile,
        U_KitchenTy: "Clean",
        U_Stu: customerVisit.inquiry_type,
        U_SR: "1",
        U_LVstDt: customerVisit.inquiry_date,
        U_App: "Website",
        U_RefEmp: empRefreence,
        U_Date: customerVisit.inquiry_date,
        U_Remarks: remark,
        U_Email: customerVisit.email,
        U_Budget: customerVisit.budget_amount,
        U_OfferNo: '',
        U_OfferAm: offered_amount,
        U_HowYouKnowUs: 'Facebook',
        U_influencer: influencer,
        U_BuildingType: building_type,
        U_DeliveryTime: dellivery_time,
        U_CompetitorVisited: competitor_visit,
        U_CompetitorName: competitor_name,
        U_NotBuyingReason: not_buying_reason,
        U_KitchenType: kitchen_type,
        U_KitchenDesign: kitchen_design,
        U_Worktop: worktops,
        U_FoodStorage: fs,
        U_CookwareStorage: cs,
        U_AppStorage: as,
        U_DinningArea: da
    }
}

function parseSaleQuote(saleOffer) {
    let product_items = [];
    for (let product_item of saleOffer.product_items) {
        let obj = {
            // "ItemCode": product_item.product_code,
            "ItemCode": "NOB-0001",
            "Quantity": product_item.quantity,
            "TaxCode": product_item.tax_code,
            "UnitPrice": product_item.unit_price,
            "LineTaxJurisdictions": [],
          
            "DocumentLineAdditionalExpenses": [
                {
                    "ExpenseCode": 1, //First Discount
                    "LineTotal": product_item.discount_1_amount,//discount_1_amount
                    "TaxLiable": "tYES",
                    "VatGroup": "OA1"
                },
                {
                    "ExpenseCode": 2, //second Discount
                    "LineTotal": product_item.discount_2_amount,//discount_2_amount
                    "TaxLiable": "tYES",
                    "VatGroup": "OA1"
                },
                {
                    "ExpenseCode": 3, //Third Discount
                    "LineTotal": product_item.discount_3_amount,//discount_3_amount
                    "TaxLiable": "tYES",
                    "VatGroup": "OA1"
                },
            ]
        }
        product_items.push(obj);
    }

    return {
        "CardCode": "CP05-001212",
        "Series": saleOffer.branch.salesQuotationSeries,
        // "CardCode": saleOffer.customer.code,
        "DocDate": saleOffer.docs_date,
        "DocDueDate": saleOffer.post_date,
        "NumAtCard": 2000092,
        // "Quantity": product_item.quantity,
        "Quantity": 1,

        //"U_WOID": "60956268dc8c3100083d4163",
        "U_DocType": saleOffer.docs_type,
        "U_OrdStatus": saleOffer.docs_status,
        "U_BaseContractNo": (saleOffer.approval || {}).base_contract_no || "",
        // "U_SPComCode": saleOffer.commission_code,
        "U_SPComCode": "AC00248",
        "SlpCode": (saleOffer.sales_person || {}).series,
        "OwnerCode": (saleOffer.sales_person || {}).series,
        "DocumentLines": product_items,
        "AddressExtension": {
            "ShipToStreet": (saleOffer.customer.address || {}).address_line_1 || "",
            "ShipToBlock": (saleOffer.customer.address || {}).address_line_2 || "",
            "ShipToZipCode": (saleOffer.customer.address || {}).postal_code || "",
            "ShipToAddress2": "",
            "ShipToAddress3": "",
            "ShipToCity": (saleOffer.customer.address || {}).state,
            "ShipToCountry": (saleOffer.customer.address || {}).country
        }
    }
}

function parseSaleOrder(saleOrder, saleOffer) {
    let products = [];
    for (let product_item of saleOffer.product_items) {
        let obj = {
            // "BaseType": product_item.baseType,
            // "BaseEntry": product_item.baseEntry,
            // "BaseLine": product_item.baseLine
            "BaseType": 23,
            "BaseEntry": "124909", //DocEntry of Sales Quotation
            "BaseLine": 0
        }
        products.push(obj)
    }
    return {
        // "Series": saleOrder.branch.series,
         // "Series": 105,

        "CardCode": saleOrder.customer.code,
        "DocDate": saleOrder.docs_date,
        "DocDueDate": saleOrder.post_date,
        "NumAtCard": 4000004,
        //"U_WOID": "60956268dc8c3100083d4163",
        "U_DocType": saleOrder.docs_type,
        "U_OrdStatus": saleOrder.docs_status,
        "U_BaseContractNo": saleOrder.customer_contact_person || "",
        "U_SPComCode": saleOrder.commission_code,
        "SlpCode": (saleOrder.sales_person || {}).series,
        "OwnerCode": (saleOrder.sales_person || {}).series,
        "U_latitude": "42.2145546",
        "U_longitude": "43.215546",
        "U_FloorNo": "1st Floor",
        "U_District": "Riyadh",
        "U_BrManager": (saleOrder.branch_manager || {}).first_name,
        "DocumentLines": products
    }

}

module.exports = {
    parseBussinessPartnerBody,
    parseCustomerVisit,
    parseSaleQuote,
    parseSaleOrder
}