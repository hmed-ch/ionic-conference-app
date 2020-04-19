import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserData } from './user-data';

@Injectable({
  providedIn: 'root'
})
export class ConferenceData {
  data: any;
  banks:any;
  private _data: any;

  constructor(public http: HttpClient, public user: UserData) {
    this.http.get('assets/data/data.json').subscribe(
          (data: any) => {
                        this.banks=data['banks'];
            });
        this.data={
    "comptes" : {
        "Compte principal" : [ 
            {
                "Intituleducompte" : "Compte DEMO 1",
                "Montant" : "32501.730",
                "Bank" : "Compte principal",
                "Numerodecompte" : "000110111111"
            }, 
            {
                "Intituleducompte" : "Compte DEMO 2",
                "Montant" : "-32124.250",
                "Bank" : "Compte principal",
                "Numerodecompte" : "000110111112"
            }
        ]
    },
    "loading" : false,
    "transactions" : [ 
        {
            "Montant" : "739.067",
            "Solde" : "739.067",
            "Label" : "ENC 0005 CHQ 13.01",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Cheque",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "199.185",
            "Solde" : "199.185",
            "Label" : "ENC 0004 CHQ 13.01",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Cheque",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-0.270",
            "Solde" : "-0.270",
            "Label" : "TVA SUR CION ENCAISSEMENT",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-1.500",
            "Solde" : "-1.500",
            "Label" : "CION ENC/ 0000003 CHQ 0007",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-29.500",
            "Solde" : "-29.500",
            "Label" : "CION\\CHQ 6868363",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-29.500",
            "Solde" : "-29.500",
            "Label" : "CION\\CHQ 6868359",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "10000.000",
            "Solde" : "10000.000",
            "Label" : "VERSEMENT",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Versement",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "4500.000",
            "Solde" : "4500.000",
            "Label" : "VERSEMENT",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Versement",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "446.400",
            "Solde" : "446.400",
            "Label" : "VERSEMENT",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Versement",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-0.090",
            "Solde" : "-0.090",
            "Label" : "TVA SUR CION ENCAISSEMENT",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-0.090",
            "Solde" : "-0.090",
            "Label" : "TVA SUR CION ENCAISSEMENT",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-0.225",
            "Solde" : "-0.225",
            "Label" : "TVA SUR CION ENCAISSEMENT",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-0.500",
            "Solde" : "-0.500",
            "Label" : "CION ENC/ 0000001 CHQ 0003",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-0.500",
            "Solde" : "-0.500",
            "Label" : "CION ENC/ 0000001 CHQ 0004",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-1.206",
            "Solde" : "-1.206",
            "Label" : "INTERET DE RETARD SUR EFFET IMPAYE",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-1.250",
            "Solde" : "-1.250",
            "Label" : "CION ENC/ 0000005 CHQ 0068",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-1.416",
            "Solde" : "-1.416",
            "Label" : "CION/EFFET DOMICILIE",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-6.725",
            "Solde" : "-6.725",
            "Label" : "CHQ 6371902 FAV MONDIAL ELECTRIC",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Cheque",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-27.471",
            "Solde" : "-27.471",
            "Label" : "CHQ 6371721 FAV MONDIAL ELECTRIC",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Cheque",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-191.135",
            "Solde" : "-191.135",
            "Label" : "CHQ. 3556310 UAL 738",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Cheque",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-442.897",
            "Solde" : "-442.897",
            "Label" : "CHQ 5193524 FAV C N S S",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Cheque",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-2029.594",
            "Solde" : "-2029.594",
            "Label" : "REGLEMENT EFFET IMPAYE  13.01.09",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-3848.750",
            "Solde" : "-3848.750",
            "Label" : "REG EFFET DOMICILIE AU 15.01.09",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-175900.633",
            "Solde" : "-175900.633",
            "Label" : "CHQ 2905852 FAV C N S S",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Cheque",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-5.900",
            "Solde" : "-5.900",
            "Label" : "CION / EFFET IMPAYE",
            "Date" : "Sun, 08 Nov 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-7.054",
            "Solde" : "-7.054",
            "Label" : "INTERET DE RETARD SUR EFFET IMPAYE",
            "Date" : "Sun, 08 Nov 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-46.550",
            "Solde" : "-46.550",
            "Label" : "FRAIS HUIS CHQ 6868363",
            "Date" : "Sun, 08 Nov 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-48.770",
            "Solde" : "-48.770",
            "Label" : "FRAIS HUIS CHQ 6868359",
            "Date" : "Sun, 08 Nov 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-654.912",
            "Solde" : "-654.912",
            "Label" : "CHQ 7457889 FAV NEW GUARD PROTECT \"S",
            "Date" : "Sun, 08 Nov 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Cheque",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-856.800",
            "Solde" : "-856.800",
            "Label" : "CHQ 6868363 FAV KEFI WISSEM",
            "Date" : "Sun, 08 Nov 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Cheque",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-969.300",
            "Solde" : "-969.300",
            "Label" : "CHQ 7457894 FAV STE SCOOP INFORMATIQ",
            "Date" : "Sun, 08 Nov 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Cheque",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-1979.609",
            "Solde" : "-1979.609",
            "Label" : "REGLEMENT EFFET IMPAYE  03.01.09",
            "Date" : "Sun, 08 Nov 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-3450.000",
            "Solde" : "-3450.000",
            "Label" : "CHQ 7457881 FAV RECEVEUR FINANCE ARI",
            "Date" : "Sun, 08 Nov 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Cheque",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-4844.577",
            "Solde" : "-4844.577",
            "Label" : "CHQ 6868359 FAV ARAB INTERNATIONAL L",
            "Date" : "Sun, 08 Nov 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Cheque",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "101947.500",
            "Solde" : "101947.500",
            "Label" : "ENC 0001 CHQ 13.01",
            "Date" : "Sun, 08 Nov 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Cheque",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "56686.870",
            "Solde" : "56686.870",
            "Label" : "ENC 0001 CHQ 13.01",
            "Date" : "Sun, 08 Nov 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Cheque",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "18643.999",
            "Solde" : "18643.999",
            "Label" : "ENC 0008 CHQ 13.01",
            "Date" : "Sun, 08 Nov 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Cheque",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "10298.102",
            "Solde" : "10298.102",
            "Label" : "SOUS 97 OPCVM INTERFACE 007",
            "Date" : "Sun, 08 Nov 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Autre",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "7028.700",
            "Solde" : "7028.700",
            "Label" : "ENC 0003 CHQ 13.01",
            "Date" : "Sun, 08 Nov 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Cheque",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "6900.790",
            "Solde" : "6900.790",
            "Label" : "SOUS 65 OPCVM INTERFACE 007",
            "Date" : "Sun, 08 Nov 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Autre",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "555.359",
            "Solde" : "555.359",
            "Label" : "VIR O/AGENCE NAT PROTEC ENV         CIMEF",
            "Date" : "Sun, 08 Nov 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Virement",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-44.310",
            "Solde" : "-44.310",
            "Label" : "FRAIS HUIS CHQ 6157082",
            "Date" : "Sun, 08 Nov 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-322.967",
            "Solde" : "-322.967",
            "Label" : "CHEQUE NO 7491880",
            "Date" : "Sun, 08 Nov 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Cheque",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-1061.660",
            "Solde" : "-1061.660",
            "Label" : "RACHAT 10 OPCVM INTERFACE 007",
            "Date" : "Sun, 08 Nov 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Autre",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-1269.788",
            "Solde" : "-1269.788",
            "Label" : "PRV CHQ 8528919 ATB",
            "Date" : "Sun, 08 Nov 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Cheque",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-10307.696",
            "Solde" : "-10307.696",
            "Label" : "CHQ 7796840 FAV STE MARITIME MED EXP",
            "Date" : "Sun, 08 Nov 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Cheque",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-135076.630",
            "Solde" : "-135076.630",
            "Label" : "RACHAT 1285 OPCVM INTERFACE 005",
            "Date" : "Sun, 08 Nov 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Autre",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-19.727",
            "Solde" : "-19.727",
            "Label" : "CION CAUT.DEFIN. REF: 54100 2006 788 1815",
            "Date" : "Thu, 08 Oct 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-0.900",
            "Solde" : "-0.900",
            "Label" : "TVA/RECUPERATION FRAIS TTN",
            "Date" : "Thu, 08 Oct 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-0.900",
            "Solde" : "-0.900",
            "Label" : "TVA/RECUPERATION FRAIS TTN",
            "Date" : "Thu, 08 Oct 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-1.080",
            "Solde" : "-1.080",
            "Label" : "TVA/COMMISSION DE DOMICILIATION TCE",
            "Date" : "Thu, 08 Oct 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-5.900",
            "Solde" : "-5.900",
            "Label" : "CION CAUT.DEFIN. REF: 54100 2006 788 2232",
            "Date" : "Thu, 08 Oct 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-134.435",
            "Solde" : "-134.435",
            "Label" : "AGIOS  ESCOMPTE 1 LC BORDEREAU NUM 108",
            "Date" : "Thu, 08 Oct 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "7000.000",
            "Solde" : "7000.000",
            "Label" : "VIREMENT",
            "Date" : "Thu, 13 Aug 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Virement",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "1000.000",
            "Solde" : "1000.000",
            "Label" : "VERSEMENT",
            "Date" : "Thu, 13 Aug 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Versement",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "543.600",
            "Solde" : "543.600",
            "Label" : "VIR O/ FOYER HOPITAL MILITAIRE  DE GASTE",
            "Date" : "Thu, 13 Aug 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Virement",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "266.700",
            "Solde" : "266.700",
            "Label" : "VIR O/ FOYER DU MARIN                STE",
            "Date" : "Thu, 13 Aug 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Virement",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "150.000",
            "Solde" : "150.000",
            "Label" : "VERSEMENT",
            "Date" : "Thu, 13 Aug 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Versement",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "80.865",
            "Solde" : "80.865",
            "Label" : "VERSEMENT",
            "Date" : "Thu, 13 Aug 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Versement",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-1.180",
            "Solde" : "-1.180",
            "Label" : "CION / VIRT RECU",
            "Date" : "Thu, 13 Aug 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Fees and charges",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "71.100",
            "Solde" : "71.100",
            "Label" : "VIR O/IFID                          TECHN",
            "Date" : "Thu, 13 Aug 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Virement",
            "Bank" : "Compte principal"
        }, 
        {
            "Montant" : "-1179.855",
            "Solde" : "-1179.855",
            "Label" : "CHQ 6290644 RECEVEUR DE FINANCES",
            "Date" : "Fri, 08 May 2015 00:00:00 GMT",
            "Compte" : "000110111112",
            "Type" : "Cheque",
            "Bank" : "Compte principal"
        },
        {
            "Montant" : "739.067",
            "Solde" : "739.067",
            "Label" : "ENC 0005 CHQ 13.01",
            "Date" : "Tue, 08 Dec 2015 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Cheque",
            "Bank" : "Compte principal"
        },
        {
            "Montant" : "57",
            "Solde" : "57",
            "Label" : "Ooredoo",
            "Date" : "Tue, 01 Nov 2019 00:00:00 GMT",
            "Compte" : "000110123457",
            "Type" : "Telecom",
            "Bank" : "Compte principal"
        },
        {
            "Montant" : "57",
            "Solde" : "57",
            "Label" : "Ooredoo",
            "Date" : "Tue, 01 Nov 2019 00:00:00 GMT",
            "Compte" : "000110123457",
            "Type" : "Telecom",
            "Bank" : "Compte principal"
        },
        {
            "Montant" : "57",
            "Solde" : "57",
            "Label" : "Ooredoo",
            "Date" : "Tue, 01 Nov 2019 00:00:00 GMT",
            "Compte" : "000110123457",
            "Type" : "Telecom",
            "Bank" : "Compte principal"
        },
        {
            "Montant" : "57",
            "Solde" : "57",
            "Label" : "Ooredoo",
            "Date" : "Tue, 01 Nov 2019 00:00:00 GMT",
            "Compte" : "000110123458",
            "Type" : "Telecom",
            "Bank" : "Compte principal"
        }
        ,{
            "Montant" : "57",
            "Solde" : "57",
            "Label" : "Ooredoo",
            "Date" : "Tue, 01 Nov 2019 00:00:00 GMT",
            "Compte" : "000110123458",
            "Type" : "Telecom",
            "Bank" : "Compte principal"
        }
        ,{
            "Montant" : "57",
            "Solde" : "57",
            "Label" : "Ooredoo",
            "Date" : "Tue, 01 Nov 2019 00:00:00 GMT",
            "Compte" : "000110123458",
            "Type" : "Telecom",
            "Bank" : "Compte principal"
        }
        ,
        {
            "Montant" : "97",
            "Solde" : "97",
            "Label" : "Ooredoo",
            "Date" : "Mon, 01 Jun 2019 00:00:00 GMT",
            "Compte" : "000110123458",
            "Type" : "Telecom",
            "Bank" : "Compte principal"
        },{
            "Montant" : "57",
            "Solde" : "57",
            "Label" : "Ooredoo",
            "Date" : "Tue, 01 Nov 2019 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Telecom",
            "Bank" : "Compte principal"
        }
        ,{
            "Montant" : "57",
            "Solde" : "57",
            "Label" : "Ooredoo",
            "Date" : "Tue, 01 Nov 2019 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Telecom",
            "Bank" : "Compte principal"
        },{
            "Montant" : "57",
            "Solde" : "57",
            "Label" : "Ooredoo",
            "Date" : "Tue, 01 Nov 2019 00:00:00 GMT",
            "Compte" : "000110111111",
            "Type" : "Telecom",
            "Bank" : "Compte principal"
        }
        
    ]
};
        this._data = new BehaviorSubject(this.data);
        this.data.transactions.sort(function(a, b) { 
                  let c:any;
                  let d:any;
                  c=new Date(a.Date);
                  d=new Date(b.Date);
                  let bool= d-c;
                  return bool;
                  });


  }

 

  public getchangement() {
    return this._data.asObservable();
  }

  resetdata(){
    this.data={'comptes':{},'transactions':[],'loading':false};
    this._data.next("change");


  }



  getdata(){
  //this.data['loading']=true;
       /*
        console.log("transactions" in this.data);
        if (! ("transactions" in this.data)){this.data["transactions"]=[]};
        if (! ("comptes" in this.data)){this.data["comptes"]={}};
        this.data.transactions=this.data.transactions.concat(bankdata.listtransactions);
        for (let i = 0; i < bankdata.listcomptes.length; i++) {
           if(bankdata.listcomptes[i]['Bank'] in this.data.comptes ){

            this.data.comptes[bankdata.listcomptes[i]['Bank']].push(bankdata.listcomptes[i]);
          }
          else{
            this.data.comptes[bankdata.listcomptes[i]['Bank']]=[];
            this.data.comptes[bankdata.listcomptes[i]['Bank']].push(bankdata.listcomptes[i]);
          }
            } 
*/
      this.data.transactions.sort(function(a, b) { 
          let c:any;
          let d:any;
          c=new Date(a.Date);
          d=new Date(b.Date);
          let bool= d-c;
          return bool;
          });
          
      
    return this.data;
  }

  adddata(payload){
    this.data['loading']=true;
    
    
    let bankdata :any;



    this.http.post("https://api.verifi.li/openapi", payload).subscribe(
          (data: any) => {
           
            bankdata = data;
            this.data.transactions=[... new Set(this.data.transactions.concat(bankdata.listtransactions))]
        for (let i = 0; i < bankdata.listcomptes.length; i++) {
           if(bankdata.listcomptes[i]['Bank'] in this.data.comptes ){
              if (i==0){
                this.data.comptes[bankdata.listcomptes[i]['Bank']]=[];
              }

            this.data.comptes[bankdata.listcomptes[i]['Bank']].push(bankdata.listcomptes[i]);
          }
          else{
            this.data.comptes[bankdata.listcomptes[i]['Bank']]=[];
            this.data.comptes[bankdata.listcomptes[i]['Bank']].push(bankdata.listcomptes[i]);
          }
            } 


      this.data.transactions.sort(function(a, b) { 
          let c:any;
          let d:any;
          c=new Date(a.Date);
          d=new Date(b.Date);
          let bool= d- c;
          return bool;
          });

       this.data['loading']=false;
       this._data.next("change");

          },
        );
        


  }
  gettransactions(account){
    
    let listtransactions={};
    
    if (account=="all"){
      for (let i = 0; i < this.data.transactions.length; i++) {

        if (this.data.transactions[i]['Date']) {
        if(this.data.transactions[i]['Date'] in  listtransactions){
        listtransactions[this.data.transactions[i]['Date']].push(this.data.transactions[i])
      }else{
        listtransactions[this.data.transactions[i]['Date']]=[];
         listtransactions[this.data.transactions[i]['Date']].push(this.data.transactions[i])

      }
        } }

    }
    else {
      
      for (let i = 0; i < this.data.transactions.length; i++) {
        

        if(this.data.transactions[i]['Compte']==account && this.data.transactions[i]['Date']){
          if(this.data.transactions[i]['Date'] in  listtransactions){
        listtransactions[this.data.transactions[i]['Date']].push(this.data.transactions[i])
          }else{
            listtransactions[this.data.transactions[i]['Date']]=[];
             listtransactions[this.data.transactions[i]['Date']].push(this.data.transactions[i])

      }
        }}



    }
    this._data.next("change");
    console.log(listtransactions);
    return listtransactions

  }



  
}
