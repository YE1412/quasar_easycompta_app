// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  startTitle: 'Start',
  startLinkName: 'Start',
  startLinkTarget: '/start',
  registerTitle: 'Sign up',
  registerLinkName: 'SignUp',
  registerLinkTarget: '/register',
  homeTitle: 'Home',
  homeLinkName: 'Home',
  homeLinkTarget: '/home/:homeParams?',
  homeBisLinkName: 'HomeBis',
  homeBisLinkTarget: '',
  homeTerLinkName: 'HomeTer',
  homeTerLinkTarget: '/home',
  profileTitle: 'Profile',
  profileLinkName: 'Profile',
  profileLinkTarget: '/profile',
  aboutTitle: 'About',
  aboutLinkName: 'About',
  aboutLinkTarget: '/about',
  serviceTitle: 'Service',
  serviceLinkName: 'Service',
  serviceLinkTarget: '/service/:type?',
  actorTitle: 'Actor',
  actorLinkName: 'Actor',
  actorLinkTarget: '/actor/:type?',
  orderTitle: 'Order',
  orderLinkName: 'Order',
  orderLinkTarget: '/order/:type?',
  paymentTitle: 'Payment',
  paymentLinkName: 'Payment',
  paymentLinkTarget: '/payment/:type?',
  invoiceTitle: 'Invoice',
  invoiceLinkName: 'Invoice',
  invoiceLinkTarget: '/invoice/:type?',
  exportTitle: 'Export',
  exportLinkName: 'Export',
  exportLinkTarget: '/export',
  pdfTitle: 'Export to pdf',
  pdfLinkName: 'PdfExport',
  pdfLinkTarget: '/pdf/:invoiceIds(\\d+)*',
  pdfPreLinkTarget: '/pdf/',
  drawer: {
    title: 'Links'
  },
  toolbar: {
    languageLabel: 'Languages',
    dropdownHeader: 'Languages selection',
    dropdownDefault: 'Default ({lang})',
  },
  comptaLinks: {
    services: {
      title: 'Services',
      admin: 'Manage',
      adminLabel: 'Services managment',
      adminLink: '/service/admin',
      display: 'Display',
      displayLabel: 'Services display',
      displayLink: '/service/display',
    },
    actors: {
      title: 'Actors',
      admin: 'Manage',
      adminLabel: 'Actors managment',
      adminLink: '/actor/admin',
      display: 'Display',
      displayLabel: 'Actors display',
      displayLink: '/actor/display',
    },
    orders: {
      title: 'Orders',
      admin: 'Manage',
      adminLabel: 'Orders managment',
      adminLink: '/order/admin',
      display: 'Display',
      displayLabel: 'Orders display',
      displayLink: '/order/display',
    },
    payments: {
      title: 'Payments',
      admin: 'Manage',
      adminLabel: 'Payments managment',
      adminLink: '/payment/admin',
      display: 'Display',
      displayLabel: 'Payments display',
      displayLink: '/payment/display',
    },
    invoices: {
      title: 'Invoices',
      admin: 'Manage',
      adminLabel: 'Invoices managment',
      adminLink: '/invoice/admin',
      display: 'Display',
      displayLabel: 'Invoices display',
      displayLink: '/invoice/display',
    },
    export: {
      title: 'Export',
      link: '/export'
    },
  },
  servicesComponent: {
    tableTitle: 'Services',
    headTable: {
      name: 'Name',
      amount: 'Unit amount excl. taxes',
      quantity: 'Quantity',
    },
    inputLabels: {
      name: 'Name',
      amount: 'Amount',
      quantity: 'Quantity',
    },
    placeholders: {
      name: 'Name',
      amount: 'Amount',
      quantity: 'Quantity',
    },
    hints: {
      name: 'Service name must contain less than 30 characters and not contain numbers !',
      amount: 'Amount must be lower than 1,000,000 !',
      quantity: 'Quantity must be lower than 50 !',
    },
    errors: {
      empty: {
        tableBodyContentText: 'Sorry... No service.',
        name: 'Service name can\'t be empty !',
        amount: 'Amount can\'t be empty !',
        quantity: 'Quantity can\'t be empty !',
        buttonAdding: 'Add a new service',
        buttonUpdating: 'Update service',
      },
      error: {
        name: 'Bad service name supplied !',
        amount: 'Bad amount supplied !',
        quantity: 'Bad quantity supplied !',
      },
    },
    results: {
      ok: {
        add: 'Service added successfully !',
        update: 'Service updated successfully !',
        delete: 'Service deleted successfully !',
      },
      ko: {
        add: 'An error occured while adding service: {err}',
        update: 'An error occured while updating service: {err}',
        delete: 'An error occured while deleting service : {err}',
      },
    },
  },
  actorsComponent: {
    tableTitle: 'Actors',
    headTable: {
      firstName: 'Firstname',
      lastName: 'Lastname',
      email: 'Email',
      streetNum: 'Street N#',
      streetName: 'Street name',
      cp: 'Postal code',
      city: 'City',
      tel: 'Phone N#',
      sellerNum: 'Seller N#',
      type: 'Type',
    },
    inputLabels: {
      firstName: 'Firstname',
      lastName: 'Lastname',
      email: 'Email',
      streetNum: 'Street N#',
      streetName: 'Street name',
      cp: 'Postal code',
      city: 'City',
      tel: 'Phone number',
      sellerNum: 'Seller N#',
      type: 'Type',
      sellerType: 'Seller',
      buyerType: 'Buyer',
    },
    placeholders: {
      firstName: 'Firstname',
      lastName: 'Lastname',
      email: 'Email',
      streetNum: 'Street N#',
      streetName: 'Street name',
      cp: 'Postal code',
      city: 'City',
      tel: 'Phone number',
      sellerNum: 'Seller N#',
      type: 'Type',
    },
    hints: {
      firstName: 'Firstname must contain at least 2 and less than 15 alphabetical characters !',
      lastName: 'Lastname must contain at least 2 and less than 15 alphabetical characters !',
      email: 'Email must be valid !',
      streetNum: 'Street N# must have numerical characters with optional BIS/TER !',
      streetName: 'Street Name must contain at least 2 and less than 15 alphabetical characters !',
      cp: 'Postal code must contain 5 numerical characters !',
      city: 'City must contain at least 2 and less than 15 characters !',
      tel: 'Phone N# must contain 10 numerical characters !',
      sellerNum: 'Seller N# must be valid !',
      type: 'Actor type must be of type seller, buyer or both !',
    },
    errors: {
      empty: {
        tableBodyContentText: 'Sorry... No actor.',
        firstName: 'Firstname can\'t be empty !',
        lastName: 'Lastname can\'t be empty !',
        email: 'Email can\'t be empty !',
        streetNum: 'Street N# can\'t be empty !',
        streetName: 'Street Name can\'t be empty !',
        cp: 'Postal code can\'t be empty !',
        city: 'City can\'t be empty !',
        tel: 'Phone N# can\'t be empty !',
        sellerNum: 'Seller N# can\'t be empty !',
        type: 'Actor type can\'t be empty !',
        buttonAdding: 'Add a new actor',
        buttonUpdating: 'Update actor',
      },
      error: {
        firstName: 'Bad firstname supplied !',
        lastName: 'Bad lastname supplied !',
        email: 'Bad email supplied !',
        streetNum: 'Bad street N# supplied !',
        streetName: 'Bad street Name supplied !',
        cp: 'Bad postal code supplied !',
        city: 'Bad city supplied !',
        tel: 'Bad phone N# supplied !',
        sellerNum: 'Bad seller N# supplied !',
        type: 'Bad actor type supplied !',
      },
    },
    results: {
      ok: {
        add: 'Actor added successfully !',
        update: 'Actor updated successfully !',
        delete: 'Actor deleted successfully !',
      },
      ko: {
        add: 'An error occured while adding actor: {err}',
        update: 'An error occured while updating actor: {err}',
        delete: 'An error occured while deleting actor: {err}',
      },
    },
    libelles: {
      actorTypes: {
        both: 'Buyer, Seller',
        buyer: 'Buyer',
        seller: 'Seller',
      },
      no_sellerNum: 'No seller N#.',
    }
  },
  ordersComponent: {
    tableTitle: 'Orders',
    headTable: {
      contenuAdditionnel: 'Additional content',
      services: 'Services',
      priceHt: 'Price Excl. Taxes',
      facture: 'Invoice',
    },
    inputLabels: {
      contenuAdditionnel: 'Additional content',
      services: 'Services',
      priceHt: 'Price',
      facture: 'Invoices',
    },
    placeholders: {
      contenuAdditionnel: 'Additional content',
      services: 'Services',
      priceHt: 'Price',
      facture: 'Invoices',
    },
    hints: {
      contenuAdditionnel: 'Additional content must contain at least 2 and less than 30 alphanumeric characters and is not mandatory !',
      services: 'At least 1 service must be selected !',
      priceHt: 'Price must be greater than 0 !',
      facture: 'An invoice is not required !',
    },
    errors: {
      empty: {
        tableBodyContentText: 'Sorry... No order.',
        contenuAdditionnel: 'Additionnal content can\'t be empty !',
        services: 'Services can\'t be empty !',
        priceHt: 'Price can\'t be empty !',
        facture: 'Invoice can\'t be empty !',
        buttonAdding: 'Add a new order',
        buttonUpdating: 'Update order',
      },
      error: {
        contenuAdditionnel: 'Bad additionnal content supplied !',
        services: 'Bad services supplied !',
        priceHt: 'Bad prices supplied !',
        facture: 'Bad invoice supplied !',
      },
    },
    results: {
      ok: {
        add: 'Order added successfully !',
        update: 'Order updated successfully !',
        delete: 'Order deleted successfully !',
      },
      ko: {
        add: 'An error occured while adding order: {err}',
        update: 'An error occured while updating order: {err}',
        delete: 'An error occured while deleting order: {err}',
        fetch_services: 'An error occured while fetching services: {err}',
        fetch_invoices: 'An error occured while fetching invoices: {err}',
      },
    },
    libelles: {
      no_additional_content: 'No additionnal content.',
      no_option_services: 'No service.',
      no_invoice: 'No invoice affected.',
    }
  },
  paymentsComponent: {
    tableTitle: 'Payments',
    headTable: {
      etat: 'Payment state',
      paymentValue: 'Payment value',
      paymentType: 'Payment type',
      facture: 'Invoice',
    },
    inputLabels: {
      etat: 'State',
      paymentValue: 'Value',
      paymentType: 'Type',
      facture: 'Invoice',
    },
    placeholders: {
      etat: 'State',
      paymentValue: 'Value',
      paymentType: 'Type',
      facture: 'Invoices',
    },
    hints: {
      etat: 'State field is mandatory !',
      paymentValue: 'Value can\'t be greater than the invoice price !',
      paymentType: 'Type field is mandatory',
      facture: 'Invoice filed is mandatory',
    },
    errors: {
      empty: {
        tableBodyContentText: 'Sorry... No payment.',
        etat: 'Payment state can\'t be empty !',
        paymentValue: 'Payment value can\'t be empty !',
        paymentType: 'Payment type can\'t be empty !',
        facture: 'Invoice can\'t be empty !',
        buttonUpdating: 'Update payment',
        buttonAdding: 'Add a new payment',
      },
      error: {
        etat: 'Bad state supplied !',
        paymentValue: 'Bad value supplied, must be equals or lower than {val} !',
        paymentType: 'Bad type supplied !',
        facture: 'Bad invoice supplied !',
      },
    },
    results: {
      ok: {
        add: 'Payment added successfully !',
        update: 'Payment updated successfully !',
        delete: 'Payment deleted successfully !',
      },
      ko: {
        add: 'An error occured while adding payment: {err}',
        update: 'An error occured while updating payment: {err}',
        delete: 'An error occured while deleting payment: {err}',
        fetch_invoices: 'An error occured wihle fetching invoices: {err}',
        fetch_etats: 'An error occured while fetching states: {err}',
        fetch_types: 'An error occured while fetching types: {err}',
      },
    },
    libelles: {
      no_invoice: 'No invoice affected !',
      no_option_invoice: 'No invoice.',
      no_etat: 'No payment state affected !',
      no_option_etat: 'No state.',
      no_type: 'No payment type affected !',
      no_option_type: 'No type.',
      types: {
        cb: 'Credit card',
        esp: 'Cash',
        chq: 'Check',
      },
      etats: {
        paid: 'Paid',
        not_paid: 'Not paid',
      },
    },
  },
  invoicesComponent: {
    tableTitle: 'Invoices',
    headTable: {
      date: 'Invoice date',
      invoiceHTPrice: 'Invoice price Excl. Taxes',
      invoiceTTPrice: 'Invoice price Incl. Taxes',
      language: 'Invoice language',
      devise: 'Invoice devise',
      tva: 'Invoice VAT',
      buyer: 'Invoice buyer',
      seller: 'Invoice seller',
      commande: 'Invoice orders',
      payment: 'Invoice payments',
    },
    inputLabels: {
      date: 'Date',
      invoiceHTPrice: 'Price',
      invoiceTTPrice: 'Price + Taxes',
      language: 'Language',
      devise: 'Devise',
      tva: 'VAT',
      buyer: 'Buyer',
      seller: 'Seller',
      commande: 'Orders',
      payment: 'Payments',
    },
    placeholders: {
      date: 'Date',
      invoiceHTPrice: 'Price',
      invoiceTTPrice: 'Price + Taxes',
      language: 'Languages',
      devise: 'Devises',
      tva: 'VAT',
      buyer: 'Buyers',
      seller: 'Sellers',
      commande: 'Orders',
      payment: 'Payments',
    },
    hints: {
      date: 'Date must be greater than the current date !',
      invoiceHTPrice: 'Price must be lower than orders total price !',
      invoiceTTPrice: 'Price + Taxes must be lower than orders price !',
      language: 'Language field is mandatory',
      devise: 'Devise field is mandatory !',
      tva: 'VAT must be greater than 0 and lower than 1 !',
      buyer: 'Buyer field is mandatory !',
      seller: 'Seller field is mandatory !',
      commande: 'Orders field is mandatory !',
      payment: 'Payment field is not mandatory, but if supplied it must not be greater than invoice price !',
    },
    errors: {
      empty: {
        tableBodyContentText: 'Sorry... No invoice.',
        date: 'Date can\'t be empty !',
        invoiceHTPrice: 'Price can\'t be empty !',
        invoiceTTPrice: 'Price + Taxes can\'t be empty !',
        language: 'Language can\'t be empty !',
        devise: 'Devise can\'t be empty !',
        tva: 'VAT can\'t be empty !',
        buyer: 'Buyer can\'t be empty !',
        seller: 'Seller can\'t be empty !',
        commande: 'Orders can\'t be empty !',
        payment: 'Payments can\'t be empty !',
        buttonUpdating: 'Update invoice',
        buttonAdding: 'Add a new invoice',
      },
      error: {
        date: 'Bad date supplied !',
        invoiceHTPrice: 'Bad price supplied !',
        invoiceTTPrice: 'Bad price + Taxes supplied !',
        language: 'Bad language supplied !',
        devise: 'Bad devise supplied !',
        tva: 'Bad VAT supplied !',
        buyer: 'Bad buyer supplied !',
        seller: 'Bad seller supplied !',
        commande: 'Bad orders supplied !',
        payment: 'Bad payments supplied !',
      },
    },
    results: {
      ok: {
        add: 'Invoice added successfully !',
        update: 'Invoice updated successfully !',
        delete: 'Invoice deleted successfully !',
      },
      ko: {
        add: 'An error occured while adding invoice: {err}',
        update: 'An error occured while updating invoice: {err}',
        delete: 'An error occured while deleting invoice: {err}',
        fetch_languages: 'An error occured wihle fetching languages: {err}',
        fetch_devises: 'An error occured while fetching devises: {err}',
        fetch_buyers: 'An error occured while fetching buyers: {err}',
        fetch_sellers: 'An error occured while fetching sellers: {err}',
        fetch_orders: 'An error occured while fetching orders: {err}',
        fetch_payments: 'An error occured while fetching payments: {err}',
      },
    },
    libelles: {
      no_order: 'No order affected !',
      no_option_order: 'No order.',
      no_payment: 'No payment affected !',
      no_option_payment: 'No payment.',
      no_language: 'No language affected !',
      no_option_language: 'No language.',
      no_devise: 'No devise affected !',
      no_option_devise: 'No devise.',
      no_buyer: 'No buyer affected !',
      no_option_buyer: 'No buyer.',
      no_seller: 'No seller affected !',
      no_option_seller: 'No seller.',
      no_date: 'No date supplied !',
    },
  },
  profileComponent: {
    titles: {
      update: 'Update my profile',
      register: 'Register form',
    },  
    inputLabels: {
      firstName: 'Firstname',
      lastName: 'Lastname',
      login: 'Login',
      email: 'Email',
      confirmEmail: 'Email confirmation',
      pass: 'Password',
      confirmPass: 'Password confirmation',
      companyName: 'Company name',
      companyLogo: 'Company logo',
      devise: 'Devise',
      userType: 'Type',
    },
    placeholders: {
      firstName: 'Firstname',
      lastName: 'Lastname',
      login: 'Login',
      email: 'Email',
      confirmEmail: 'Email confirmation',
      pass: 'Password',
      confirmPass: 'Password confirmation',
      companyName: 'Company name',
      companyLogo: 'Company logo',
      devise: 'Devises',
      userType: 'Types',
    },
    hints: {
      firstName: 'Firstname is mandatory !',
      lastName: 'Lastname is mandatory !',
      login: 'Login is mandatory !',
      email: 'Email is mandatory !',
      confirmEmail: 'Email confirmation is mandatory !',
      pass: 'Password is mandatory and must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character !',
      confirmPass: 'Password confirmation is mandatory !',
      companyName: 'Company name is mandatory !',
      companyLogo: 'Company logo is optionnal, if supplied, file must be an svg type of maximum {size} bytes !',
      devise: 'Devise is mandatory !',
      userType: 'Type is mandatory !',
    },
    errors: {
      empty: {
        firstName: 'Firstname can\'t be empty !',
        lastName: 'Lastname can\'t be empty !',
        login: 'Login can\'t be empty !',
        email: 'Email can\'t be empty !',
        confirmEmail: 'Email confirmation can\'t be empty !',
        pass: 'Password can\'t be empty !',
        confirmPass: 'Password confirmation can\'t be empty !',
        companyName: 'Company name can\'t be empty !',
        companyLogo: 'Company logo can\'t be empty !',
        devise: 'Devise can\'t be empty !',
        userType: 'Type can\'t be empty !',
      },
      error: {
        firstName: 'Bad firstname supplied !',
        lastName: 'Bad lastname supplied !',
        login: 'Bad login supplied !',
        email: 'Bad email supplied !',
        confirmEmail: 'Bad email confirmation supplied !',
        emailBusy: 'Email already exists !',
        emailMissmatch: 'Email and confirm missmatch !',
        pass: 'Bad password supplied !',
        confirmPass: 'Bad password confirmation supplied !',
        passMissmatch: 'Password and confirml missmatch',
        companyName: 'Bad company name supplied !',
        companyLogo: 'Bad company logo supplied !',
        devise: 'Bad devise supplied !',
        userType: 'Bad type supplied !',
      },
    },
    libelles: {
      no_devise: 'No devise affected !',
      no_option_devise: 'No devise.',
      no_type: 'No type affected !',
      no_option_type: 'No type.',
      updateButton: 'Submit',
      resetButton: 'Reset',
      types: {
        regular: 'Manager',
        admin: 'Administrator',
      },
    },
    results: {
      ok: {
        add: 'Profile added successfully !',
        update: 'Profile updated successfully !',
        delete: 'Profile deleted successfully !',
      },
      ko: {
        add: 'An error occured while adding user: {err}',
        update: 'An error occured while updating user: {err}',
        delete: 'An error occured while deleting user: {err}',
        fetch_user: 'An error occured while fetching user informations: {err}',
        fetch_userTypes: 'An error occured while fetching user types: {err}',
        upload: 'An error occured while uploading company logo file: {err}',
        checkEmail: 'An error occured while checking the email availability: {err}'
      },
    },
  },
  exportsComponent: {
    tableTitle: 'Export',
    results: {
      // ok: {
      //   add: 'Invoice added successfully !',
      //   update: 'Invoice updated successfully !',
      //   delete: 'Invoice deleted successfully !',
      // },
      ko: {
        // add: 'An error occured while adding invoice: {err}',
        // update: 'An error occured while updating invoice: {err}',
        // delete: 'An error occured while deleting invoice: {err}',
        fetch_invoices: 'An error occured wihle fetching invoices: {err}',
      },
    },
    libelles: {
      invoice: 'Invoice',
      billingAddressLibelle: 'Billing address :',
      addContentLibelle: 'Additional content :',
      buyerLibelle: 'Buyer :',
      sellerLibelle: 'Seller :',
      dateLibelle: 'Date :',
      orderNumberLibelle: 'Order N#',
      descriptionLibelle: 'Description',
      serviceNumberLibelle: 'Service ID',
      ttUnitPriceLibelle: 'Unit. Amount Incl. Taxes',
      quantityLibelle: 'Quantity',
      ttNetPriceLibelle: 'Net price Incl. Taxes',
      ttOverallAmountLibelle: 'Amount Incl. Taxes',
      totalLibelle: 'Total',
      vatLibelle: 'VAT',
      vatBaseLibelle: 'VAT Base',
      vatAmountLibelle: 'VAT Amount',
      ttTotalLibelle: 'Total Incl. Taxes',
    },
  },
  homeComponent: {
    headTable: {
      totalFiscalYearHTIncomes: 'Total fiscal year incomes excl. taxes',
      totalFiscalYearTTIncomes: 'Total fiscal year incomes incl. taxes',
      totalFiscalYearPaymentsIncomes: 'Withdrawal in the fiscal year',
    },
    labels: {
      servicesLabel: 'Service(s)',
      invoicesLabel: 'Invoice(s)',
      ordersLabel: 'Order(s)',
      actorsLabel: 'Actor(s)',
    },
    barChart: {
      juneLabel: 'June {year}',
      julyLabel: 'July {year}',
      augustLabel: 'August {year}',
      septemberLabel: 'September {year}',
      octoberLabel: 'October {year}',
      novemberLabel: 'November {year}',
      decemberLabel: 'December {year}',
      januaryLabel: 'January {year}',
      februaryLabel: 'February {year}',
      marchLabel: 'March {year}',
      aprilLabel: 'April {year}',
      mayLabel: 'May {year}',
      datasetLabel: 'Invoice(s) number',
      heading: 'Number of invoices dispatch'
    },
    pieChart: {
      cbLabel: 'Credit card',
      cashLabel: 'Cash',
      chqLabel: 'Check',
      heading: 'Received payment type dispatch',
    },
    homeTable: {
      heading: 'Fiscal year stats',
    },
    results: {
      ko: {
        fetch_stats: 'An error occured while fetching stats : {err}',
      },
    },
  },
  startComponent: {
    title: 'Sign in form',
    inputLabels: {
      login: 'Login or email',
      pass: 'Password'
    },
    placeholders: {
      login: 'Login/email',
      pass: 'Password',
    },
    hints: {
      login: 'Login or email used in register form is mandatory !',
      pass: 'password used in register form is mandatory!',
    },
    errors: {
      empty: {
        login: 'Login can\'t be empty !',
        pass: 'Password can\'t be empty !',
      },
      error: {
        signIn: 'Bad login/email or password supplied !',
      }
    },
    results: {
      ko: {
        signIn: 'Error while signing in: {err}',
        session: 'An error occured while getting session: {err}',
      }
    },
    libelles: {
      signInButton: 'Sign In',
      resetButton: 'Reset',
      signUp: 'Register',
      logout: 'Logout',
    },
  },
  errorNotFoundComponent: {
    text: 'Oops. Nothing here...',
    buttonText: 'Go Home',
  },
  forms: {
    headTable: {
      action: 'Actions',
    },
    errors: {
      empty: {
        filterBodyContentText: 'Sorry... The filter didn\'t uncover any results',
      },
    },
    addButtonText: 'Add',
    updateButtonText: 'Update',
    deleteButtonText: 'Delete',
    exportButtonText: 'Export',
    valid: 'Ok !',
  }
};
