# Sources

### Male and Female first names
http://www.cbs.gov.il/www/children/names_2013.xls
http://www.cbs.gov.il/reader/cw_usr_view_SHTML?ID=825

English translation by google translate. 
* For each name, translate "השם שלי הוא X"
* Remove "My name is" from each result.
* Remove/fix names that do not start with an uppercase (if name starts with a lower case than gt
 took it for a word and not a name, e.g. "אליה" => "her".

### Countries

the list of countries recognized by the state of Israel
source: http://data.gov.il/dataset/323


### Cities

http://en.wikipedia.org/wiki/List_of_Israeli_cities#List_of_cities

Run in console:

    var cities = [];
    $('table.wikitable').eq(0).find('tbody > tr').each(function() {
      cities.push({
        en: $(this).find('td').eq(0).find('a').first().text(),
        he: $(this).find('td').eq(2).text()        
      });
    });
    console.log(JSON.stringify(cities, null, 2));
  
### Streets

all streets names in Givatayim (without thoes that start with "שכ" (for "שכונת")
source: http://data.gov.il/dataset/321

*TODO* - find English translations

 
### Phone numbers

// http://he.wikipedia.org/wiki/%D7%A7%D7%99%D7%93%D7%95%D7%9E%D7%AA_%D7%98%D7%9C%D7%A4%D7%95%D7%9F_%D7%91%D7%99%D7%A9%D7%A8%D7%90%D7%9C