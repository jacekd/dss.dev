CONNECT remote:localhost/functional admin admin;

DECLARE INTENT massiveinsert;

create class Requirements;

create property Requirements.name string;
create property Requirements.level integer;
create property Requirements.definition string;
create property Requirements.linkName string;
create property Requirements.type string;
create property Requirements.attributes string;
create property Requirements.other string;

create property Requirements.category string;
create property Requirements.subcategory string;


insert into Requirements (name, level, definition, linkName, type, attributes) values 
('accountability', 1, 'This category contains attributes used to measure the properties related to the cloud service provider organization. These properties may be independent of the service being provided.', 'accountability', 'slider', 'range: [0, 100], step: 5');

insert into Requirements (name, level, definition, linkName, type, attributes) values 
('agility', 1, 'Indicates the impact of a service upon a client\u2019s ability to change direction, strategy, or tactics quickly and with minimal disruption.','agility' ,'slider', 'range: [0, 100], step: 10, start: 0');

insert into Requirements (name, level, definition, linkName, type, attributes) values 
('assurance', 1, 'This category includes key attributes that indicate how likely it is that the service will be available as specified.','assurance','slider', 'range: [0, 100], step: 10, start: 0');

insert into Requirements (name, level, definition, linkName, type, attributes) values 
('financial', 1, 'The amount of money spent on the service by the client.', 'financial', 'slider', 'range: [0,100], step: 10, start: 0');

insert into Requirements (name, level, definition, linkName, type, attributes) values 
('performance', 1, 'This category covers the features and functions of the provided services.','performance', 'slider', 'range: [0, 100], step: 10, start: 10');

insert into requirements (name, level, definition, linkname, type, attributes) values 
('security and Privacy', 1, 'This category includes attributes that indicate the effectiveness of a cloud service provider\u2019s controls on access to services, service data, and the physical facilities from which services are provided.','securityandprivacy', 'slider', 'range: [0,100], step: 10');

Insert into Requirements (name, level, definition, linkName, type, attributes) values 
('usability', 1, 'The ease with which a service can be used.','usability','slider', 'range: [0,100], step: 10');



insert into Requirements (name, level, definition, linkName, type, attributes, category, subcategory) values 
('monitoring service', 3, 'Description Missing', 'accountability.auditability.monitoringService', 'select', '0:none, 5:basic, 10:freely configurable monitoring system', 'accountability', 'auditability');

insert into Requirements (name, level, definition, linkName, type, attributes, category, subcategory) values 
('data location', 3, 'Description Missing', 'accountability.compliance.dataLocation', 'select', '0:unknown, 3:outside Europe/USA, 6:USA, 10:Europe', 'accountability', 'compliance');

insert into Requirements (name, level, definition, linkName, type, attributes, category, subcategory) values 
('place of jurisdiction', 3, 'Description Missing', 'accountability.compliance.placeOfJurisdiction', 'select', '3:outside Europe/USA, 6:USA, 10:Europe', 'accountability', 'compliance');

insert into Requirements (name, level, definition, linkName, type, attributes, category, subcategory) values 
('providers customer portfolio', 3, 'Description Missing', 'accountability.governance.providersCustomerPortfolio', 'select', '0:customer running illegal or questionable services, 5:no knowledge about customers, 10: enterprise class customers running B2B services', 'accountability', 'governance');

insert into Requirements (name, level, definition, linkName, type, attributes, category, subcategory) values 
('license costs charged by providers', 3, 'Description Missing', 'accountability.ownership.licenseCostsChargedByProviders', 'select', '0:no licensing via provider available, 5:more expensive then direct licensing contracts, 8:same costs as direct licensing contracts, 10:cheaper than direct licensing contracts', 'accountability', 'ownership');

insert into Requirements (name, level, definition, linkName, type, attributes, category, subcategory) values 
('providers financial stabiity', 3, 'Description Missing', 'accountability.providerBusinessStability.providerBusinessStability', 'select', '0:chapter 11 expected, 1:unstable company - insolvency possible, 5:standard stable company - insolvency not expected, 10:very stable company - insolvency rulled out', 'accountability', 'providerBusinessStability');

insert into Requirements (name, level, definition, linkName, type, attributes, category, subcategory) values 
('information security certificates', 3, 'Description Missing', 'accountability.providerCertifications.informationSecurityCertificates', 'select', '0:none, 5:ISO20000, 10:ISO27000-PCI', 'accountability', 'providerCertifications');

insert into Requirements (name, level, definition, linkName, type, attributes, category, subcategory) values 
('site infrastucture', 3, 'Description Missing', 'agility.adaptability.siteInfrastucture', 'radio', '0:no, 1:yes', 'agility', 'adaptability');

insert into Requirements (name, level, definition, linkName, type, attributes, category, subcategory) values 
('auto scaling', 3, 'Description Missing', 'agility.elasticity.autoScaling', 'select', '0:none, 5:basic, 10:sophisticated', 'agility', 'elasticity');

insert into Requirements (name, level, definition, linkName, type, attributes, category, subcategory) values 
('load balancer', 3, 'Description Missing', 'agility.elasticity.loadBalancer', 'select', '0:none, 5:available, 10:available including sticky HTTP session feature', 'agility', 'elasticity');

insert into Requirements (name, level, definition, linkName, type, attributes, category, subcategory) values 
('relation database replication', 3, 'Description Missing', 'agility.portability.relationDatabaseReplication', 'radio', '0:none, 10:available', 'agility', 'portability');

insert into Requirements (name, level, definition, linkName, type, attributes, category, subcategory) values 
('block storage snapshot', 3, 'Description Missing', 'agility.portability.blockStoageSnapshot', 'select', '0:none, 5:available, 10:available and automatically transferred to secondary storage', 'agility', 'portability');

insert into Requirements (name, level, definition, linkName, type, attributes, category, subcategory) values 
('noSQL database sharding', 3, 'Description Missing', 'agility.scalability.nosqlDatabaseSharding', 'select', '0:none, 3:definable on setup, 6:adaptable, 10:self-adapting', 'agility', 'scalability');

insert into Requirements (name, level, definition, linkName, type, attributes, category, subcategory) values 
('message queue service', 3, 'Description Missing', 'agility.scalability.messageQueueService', 'select', '0:none, 1:proprietary message queue service, 5:JMS compatible message queue service, 10:AQMP compatible distributed and replicated message queue service', 'agility', 'scalability');

insert into Requirements (name, level, definition, linkName, type, attributes, category, subcategory) values 
('java web container PaaS scaling', 3, 'Description Missing', 'agility.scaling.javaWebContainerPaasScaling', 'select', '0:none, 1:basic JEE web container, 3:load balanced JEE container, 6:load balanced and clustered JEE web container', 'agility', 'scalability');

insert into Requirements (name, level, definition, linkName, type, attributes, category, subcategory) values 
('CAPEX', 3, 'Description Missing', 'financial.billingProcess.capex', 'select', '0:very high CAPEX (>=20000EUR), 2:high CAPEX (<20000EUR), 5:medium CAPEX (<10000EUR), 8:minor CAPEX (<5000EUR), 10:none (0EUR)', 'financial', 'billingProcess');

insert into Requirements (name, level, definition, linkName, type, attributes, category, subcategory) values 
('CAPEX for long term scaleup', 3, 'Description Missing', 'financial.billingProcess.capexForLongTermScaleup', 'select', '0:very high CAPEX (>=20000EUR), 2:high CAPEX (<20000EUR), 5:medium CAPEX (<10000EUR), 8:minor CAPEX (<5000EUR), 10:none (0EUR)', 'financial', 'billingProcess');

insert into Requirements (name, level, definition, linkName, type, attributes, category, subcategory) values 
('running charges for deactivation', 3, 'Description Missing', 'financial.cost.runningChargesForDeactivation', 'select', '0:same charges as for active elements, 5:reduced charges, 10:none', 'financial', 'cost');

insert into Requirements (name, level, definition, linkName, type, attributes, category, subcategory) values 
('running charges for data transfer', 3, 'Description Missing', 'financial.cost.runningChargesForDataTransfer', 'slider', 'max:10c/GB, min:0c/GB', 'financial', 'cost');

insert into Requirements (name, level, definition, linkName, type, attributes, category, subcategory) values 
('minimum contract commitment', 3, 'Description Missing', 'financial.financialAgility.minimumContractCommitment', 'input', '', 'financial', 'financialAgility');

insert into Requirements (name, level, definition, linkName, type, attributes, category, subcategory) values 
('online cost control', 3, 'Description Missing', 'financial.financialStructure.onlineCostControl', 'radio', '0:no, 1:yes', 'financial', 'financialStructure');

insert into Requirements (name, level, definition, linkName, type, attributes, category, subcategory) values 
('management API', 3, 'Description Missing', 'performance.functionality.managementApi', 'select', '0:not available, 4:basic, 7:sophisticated, 10:sophisticated and easy to integrate', 'performance', 'functionality');

