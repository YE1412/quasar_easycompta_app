import invoices from "app/src/db/controllers/invoice.controller.js";
export default (express) => {
  var router = express.Router();

  // Create a new Invoice
  router.post("/", invoices.create);

  // Retrieve all Invoices of an administrator
  router.get("/all/:userId", invoices.findAll);

  // Retrieve a single Invoice with id
  router.get("/find", invoices.findOne);

  // Get Financial Year Incomes of the given administrator id
  // router.get("/financialYearIncomes", invoices.getFinancialYearIncomes);

  // Get Financial Year Payments Incomes of the given administrator id
  // router.get("/financialYearPaymentsIncomes", invoices.getFinancialYearPaymentsIncomes);

  // Get Financial Year Number of invoices of the given administrator id
  router.get("/financialYearNbInvoices", invoices.getNbInvoices);

  // Get Financial Year Invoices of the given administrator id
  router.get("/financialYearInvoices", invoices.getFinancialYearInvoices);

  // Retrieve more Invoices with ids
  router.get("/find/:ids", invoices.findMore);

  // Retrieve all Orders
  router.get("/orders", invoices.findAllOrders);

  // Retrieve all Sellers
  router.get("/sellers", invoices.findAllSellers);

  // Retrieve all Buyers
  router.get("/buyers", invoices.findAllBuyers);

  // Retrieve all Devises
  router.get("/devises", invoices.findAllDevises);

  // Retrieve all Languages
  router.get("/languages", invoices.findAllLanguages);

  // Retrieve all Payments
  router.get("/payments", invoices.findAllPayments);

  // Update a Invoice with id
  router.put("/:id", invoices.update);

  // Delete a Invoice with id
  router.delete("/:id", invoices.deleteOne);

  // Delete all Invoices
  router.delete("/", invoices.deleteAll);

  // app.use('/api/invoices', router);

  return router;
};
