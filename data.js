// data.js -- collection of unchangeble data 

const websiteName = "Nuvola Elettorale"
var twitterUser = "";
var startDate = "";
var list = [];

// this is the ID for Salvini
const msalviniId = "270839361";
const msalviniScreen = "@matteosalvinimi";
// this is the ID for Giorgia Meloni
const gmeloniId = "130537001"
const gmeloniScreen = "@GiorgiaMeloni";
// this is the ID for Silvio Berlusconi
const sberlusconiId = "920277002858500096"
const sberlusconiScreen = "@berlusconi";
// this is the ID for Carlo Calenda
const ccalendaId = "2416067982"
const ccalendaScreen = "@CarloCalenda";
// this is the ID for Enrico Letta
const elettaId = "419622371"
const elettaScreen = "@EnricoLetta";
// this is the ID for Matteo Renzi
const mrenziId = "18762875"
const mrenziScreen = "@matteorenzi";
// this is the ID for Giuseppe Conte
const gconteId = "999578121123848192"
const gconteScreen = "@GiuseppeConteIT";


var possibleUsers = ["", msalviniId, gmeloniId, sberlusconiId, ccalendaId, elettaId, mrenziId, gconteId];
var possibleScreens = ["", msalviniScreen, gmeloniScreen, sberlusconiScreen, ccalendaScreen, elettaScreen, mrenziScreen, gconteScreen];
var possibleDates = ["", "1", "3", "5", "7", "14", "30"];
var possibleEasyDates = ["", "Ultime 24 ore", "Ultimi 3 giorni", "Ultimi 5 giorni", "Settimana scorsa", "Ultime 2 settimane", "Mese scorso"];

module.exports = {
  possibleUsers: possibleUsers,
  possibleScreens: possibleScreens,
  possibleDates: possibleDates,
  possibleEasyDates: possibleEasyDates,
  websiteName: websiteName,
  twitterUser: twitterUser,
  startDate: startDate,
  list: list  
};
