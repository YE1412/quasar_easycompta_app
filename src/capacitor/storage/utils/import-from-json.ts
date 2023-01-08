/*eslint @typescript-eslint/no-explicit-any: 'off'*/
export const dataToImport: any = {
	database: 'easy_compta',
	version: 9,
	encrypted: false,
	overwrite: false, 
	mode: 'partial',
	tables: [
		{
			name: 'commande',
			schema: [
				{ column: 'orderId', value: 'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL' },
				{ column: 'contenuAdditionnel', value: 'TEXT DEFAULT NULL' },
				{ column: 'priceHt', value: 'REAL DEFAULT NULL' },
				{ column: 'factureId', value: 'INTEGER DEFAULT NULL' },
				{ foreignkey: 'factureId', value: 'REFERENCES facture(factureId) ON DELETE SET NULL ON UPDATE CASCADE' }
			],
			indexes: [
				{ name: 'index_commande_orderId', value: 'orderId', mode: 'PRIMARY KEY' },
				{ name: 'index_commande_factureId', value: 'factureId' }
			],
			// 'triggers': [
			// ],
			// values: [
			// 	[1]
			// ]
		},
		{
			name: 'produitservice',
			schema: [
				{ column: 'serviceId', value: 'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL' },
				{ column: 'montantHt', value: 'REAL DEFAULT NULL' },
				{ column: 'nom', value: 'TEXT NOT NULL' },
				{ column: 'quantite', value: 'INTEGER NOT NULL' }
			],
			indexes: [
				{ name: 'index_produitservice_serviceId', value: 'serviceId', mode: 'PRIMARY KEY' }
			],
		},
		{
			name: 'contains',
			schema: [
				{ column: 'orderId', value: 'INTEGER NOT NULL' },
				{ column: 'serviceId', value: 'INTEGER NOT NULL' },
				{ foreignkey: 'orderId', value: 'REFERENCES commande(orderId) ON DELETE CASCADE ON UPDATE CASCADE' },
				{ foreignkey: 'serviceId', value: 'REFERENCES produitservice(serviceId) ON DELETE CASCADE ON UPDATE CASCADE' }
			],
			indexes: [
				{ name: 'index_contains_serviceId_orderId_unique', value: 'orderId, serviceId', mode: 'UNIQUE' },
				{ name: 'index_contains_serviceId_orderId_primary', value: 'orderId, serviceId', mode: 'PRIMARY KEY' }
			]
		},
		{
			name: 'devise',
			schema: [
				{ column: 'deviseId', value: 'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL' },
				{ column: 'symbole', value: 'TEXT DEFAULT NULL' },
				{ column: 'libelle', value: 'TEXT NOT NULL' }
			],
			indexes: [
				{ name: 'index_devise_deviseId', value: 'deviseId', mode: 'PRIMARY KEY' }
			],
			values: [
				[1, '$', 'dollar'],
				[2, '£', 'livre'],
				[3, '€', 'euro']
			]
		},
		{
			name: 'langue',
			schema: [
				{ column: 'langueId', value: 'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL' },
				{ column: 'libelle', value: 'TEXT DEFAULT NULL' },
				{ column: 'nom', value: 'TEXT DEFAULT NULL' }
			],
			indexes: [
				{ name: 'index_langue_langueId', value: 'langueId', mode: 'PRIMARY KEY' }
			],
			values: [
				[1, 'English', 'en-US'],
				[2, 'Français', 'fr-FR']
			]
		},
		{
			name: 'personne',
			schema: [
				{ column: 'actorId', value: 'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL' },
				{ column: 'cp', value: 'TEXT NOT NULL' },
				{ column: 'email', value: 'TEXT NOT NULL' },
				{ column: 'nom', value: 'TEXT NOT NULL' },
				{ column: 'nomRue', value: 'TEXT NOT NULL' },
				{ column: 'numCommercant', value: 'TEXT DEFAULT NULL' },
				{ column: 'numRue', value: 'TEXT NOT NULL' },
				{ column: 'prenom', value: 'TEXT NOT NULL' },
				{ column: 'tel', value: 'TEXT NOT NULL' },
				{ column: 'actorTypeId', value: 'INTEGER DEFAULT NULL' },
				{ column: 'ville', value: 'TEXT NOT NULL' },
				{ foreignkey: 'actorTypeId', value: 'REFERENCES personne_type(actorTypeId) ON DELETE SET NULL ON UPDATE CASCADE' }
			],
			indexes: [
				{ name: 'index_personne_actorId', value: 'actorId', mode: 'PRIMARY KEY' },
				{ name: 'index_personne_email_unique', value: 'email', mode: 'UNIQUE' },
				{ name: 'index_personne_actorTypeId', value: 'actorTypeId' }
			],
		},
		{
			name: 'personne_type',
			schema: [
				{ column: 'actorTypeId', value: 'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL' },
				{ column: 'seller', value: 'INTEGER NOT NULL' },
				{ column: 'buyer', value: 'INTEGER NOT NULL' },
			],
			indexes: [
				{ name: 'index_personne_type_actorTypeId', value: 'actorTypeId', mode: 'PRIMARY KEY' },
				{ name: 'index_personne_type_constraint', value: 'seller, buyer', mode: 'UNIQUE' }
			],
			values: [
				[1, 1, 1],
				[2, 1, 0],
				[3, 0, 1],
			],
		},
		{
			name: 'facture',
			schema: [
				{ column: 'factureId', value: 'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL' },
				{ column: 'date', value: 'TEXT DEFAULT NULL' },
				{ column: 'invoiceHTPrice', value: 'REAL DEFAULT NULL' },
				{ column: 'invoiceTTPrice', value: 'REAL DEFAULT NULL' },
				{ column: 'languageId', value: 'INTEGER DEFAULT NULL' },
				{ column: 'deviseId', value: 'INTEGER DEFAULT NULL' },
				{ column: 'tvaValue', value: 'REAL NOT NULL' },
				{ column: 'buyerId', value: 'INTEGER NOT NULL' },
				{ column: 'sellerId', value: 'INTEGER NOT NULL' },
				{ column: 'administratorId', value: 'INTEGER DEFAULT NULL' },
				{ foreignkey: 'languageId', value: 'REFERENCES langue(langueId) ON DELETE SET NULL ON UPDATE CASCADE' },
				{ foreignkey: 'deviseId', value: 'REFERENCES devise(deviseId) ON DELETE SET NULL ON UPDATE CASCADE' },
				{ foreignkey: 'buyerId', value: 'REFERENCES personne(actorId) ON DELETE CASCADE ON UPDATE CASCADE' },
				{ foreignkey: 'sellerId', value: 'REFERENCES personne(actorId) ON DELETE CASCADE ON UPDATE CASCADE' },
				{ foreignkey: 'administratorId', value: 'REFERENCES user(userId) ON DELETE SET NULL ON UPDATE CASCADE' },
			],
			indexes: [
				{ name: 'index_facture_facturId', value: 'factureId', mode: 'PRIMARY KEY' },
				{ name: 'index_facture_languageId', value: 'languageId' },
				{ name: 'index_facture_deviseId', value: 'deviseId' },
				{ name: 'index_facture_buyerId', value: 'buyerId' },
				{ name: 'index_facture_sellerId', value: 'sellerId' },
				{ name: 'index_facture_administratorId', value: 'administratorId' },
			],
		},
		{
			name: 'user',
			schema: [
				{ column: 'userId', value: 'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL' },
				{ column: 'firstName', value: 'TEXT NOT NULL' },
				{ column: 'lastName', value: 'TEXT NOT NULL' },
				{ column: 'login', value: 'TEXT NOT NULL' },
				{ column: 'email', value: 'TEXT NOT NULL' },
				{ column: 'pass', value: 'TEXT NOT NULL' },
				{ column: 'companyName', value: 'TEXT NOT NULL' },
				{ column: 'companyLogo', value: 'TEXT DEFAULT NULL' },
				{ column: 'deviseId', value: 'INTEGER NOT NULL' },
				{ column: 'userTypeId', value: 'INTEGER DEFAULT NULL' },
				{ foreignkey: 'deviseId', value: 'REFERENCES devise(deviseId) ON UPDATE CASCADE' },
				{ foreignkey: 'userTypeId', value: 'REFERENCES user_type(userTypeId) ON DELETE SET NULL ON UPDATE CASCADE' },
			],
			// indexes: [
			// 	{ name: 'index_user_userId', value: 'userId', mode: 'PRIMARY KEY' },
			// 	{ name: 'index_user_deviseId', value: 'deviseId' },
			// 	{ name: 'index_user_userTypeId', value: 'userTypeId' },
			// ],
			// values: [
			// 	[1, 'firstName', 'lastName', 'mad', 'mad@mad.fr', 'apass', 'ACompanyName', null, 3, 3]
			// ],
		},
		{
			name: 'user_type',
			schema: [
				{ column: 'userTypeId', value: 'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL' },
				{ column: 'regular', value: 'INTEGER NOT NULL' },
				{ column: 'admin', value: 'INTEGER NOT NULL' },
			],
			indexes: [
				{ name: 'index_userType_userTypeId', value: 'userTypeId', mode: 'PRIMARY KEY' },
				{ name: 'index_user_type_constraint', value: 'regular, admin', mode: 'UNIQUE' }
			],
			values: [
				[1, 1, 0],
				[2, 0, 1],
				[3, 1, 1]
			],
		},
		{
			name: 'payment',
			schema: [
				{ column: 'paymentId', value: 'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL' },
				{ column: 'etat', value: 'INTEGER NOT NULL' },
				{ column: 'paymentValue', value: 'REAL NOT NULL' },
				{ column: 'paymentType', value: 'INTEGER NOT NULL' },
				{ column: 'factureId', value: 'INTEGER DEFAULT NULL' },
				{ foreignkey: 'paymentType', value: 'REFERENCES payment_type(paymentTypeId) ON DELETE CASCADE ON UPDATE CASCADE' },
				{ foreignkey: 'factureId', value: 'REFERENCES facture(factureId) ON DELETE CASCADE ON UPDATE CASCADE' }
			],
			indexes: [
				{ name: 'index_payment_paymentId', value: 'paymentId', mode: 'PRIMARY KEY' },
				{ name: 'index_payment_paymentType', value: 'paymentType' },
				{ name: 'index_payment_factureId', value: 'factureId' },
			],
		},
		{
			name: 'payment_type',
			schema: [
				{ column: 'paymentTypeId', value: 'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL' },
				{ column: 'cb', value: 'INTEGER NOT NULL' },
				{ column: 'esp', value: 'INTEGER NOT NULL' },
				{ column: 'chq', value: 'INTEGER NOT NULL' },
			],
			indexes: [
				{ name: 'index_payment_type_paymentTypeId', value: 'paymentTypeId', mode: 'PRIMARY KEY' },
				{ name: 'index_payment_type_cb_esp_chq', value: 'cb, esp, chq', mode: 'UNIQUE' },
			],
			values: [
				[1, 1, 0, 0],
				[2, 0, 1, 0],
				[3, 0, 0, 1]
			],
		},
		{
			name: 'stock_prices',
			schema: [
				{ column: 'stockPricesId', value: 'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL' },
				{ column: 'euro', value: 'REAL NOT NULL' },
				{ column: 'dollar', value: 'REAL NOT NULL' },
				{ column: 'livre', value: 'REAL NOT NULL' },
			],
			indexes: [
				{ name: 'index_stock_prices_stockPricesId', value: 'stockPricesId', mode: 'PRIMARY KEY' },
			],
			values: [
				[1, 1, 1.04, 0.86],
				[2, 0.96, 1, 0.83],
				[3, 1.16, 1.21, 1]
			],
		}
	]
};