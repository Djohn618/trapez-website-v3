/**
 * TRAPEZ RESTAURANT - MENU DATA
 * ==============================
 * Edit this file to update the menu without touching any HTML.
 * Structure: menuData[language][section][category] = [ { name, desc, price } ]
 *
 * NOTE: Speisekarte items should be updated from the new PDF menu.
 */

const menuData = {
  de: {
    speisekarte: {
      categories: [
        {
          id: "pizza",
          title: "Pizza",
          image: "assets/images/speisekarte/Margherita.png",
          items: [
            { name: "Margherita", desc: "Tomatensauce, Mozzarella, Basilikum", price: "Fr. 16.50" },
            { name: "Napoli", desc: "Tomatensauce, Mozzarella, Sardellen, Kapern", price: "Fr. 18.50" },
            { name: "Quattro Stagioni", desc: "Mozzarella, Pilze, Schinken, Artischocken, Oliven", price: "Fr. 21.50" },
            { name: "Diavola", desc: "Tomatensauce, Mozzarella, scharfe Salami", price: "Fr. 20.50" },
            { name: "Prosciutto e Funghi", desc: "Tomatensauce, Mozzarella, Schinken, Pilze", price: "Fr. 21.00" },
            { name: "Trapez Speciale", desc: "Hausspecial mit Gorgonzola, Birne, Walnuss", price: "Fr. 23.50" },
            { name: "Vegetariana", desc: "Saisonales Gemüse, Mozzarella, Pesto", price: "Fr. 20.50" },
            { name: "Calzone", desc: "Gefüllte Pizza mit Schinken, Mozzarella, Ricotta", price: "Fr. 22.50" }
          ]
        },
        {
          id: "pasta",
          title: "Pasta",
          image: "assets/images/speisekarte/pasta.png",
          items: [
            { name: "Spaghetti Bolognese", desc: "Klassische Fleischsauce nach Hausrezept", price: "Fr. 19.50" },
            { name: "Penne all'Arrabbiata", desc: "Scharfe Tomatensauce mit Knoblauch", price: "Fr. 17.50" },
            { name: "Tagliatelle al Tartufo", desc: "Frische Pasta mit schwarzer Trüffelsauce", price: "Fr. 26.50" },
            { name: "Gnocchi al Gorgonzola", desc: "Hausgemachte Gnocchi mit Gorgonzolasauce", price: "Fr. 22.50" },
            { name: "Ravioli Spinaci", desc: "Gefüllte Ravioli mit Spinat und Ricotta", price: "Fr. 21.50" },
            { name: "Spaghetti Carbonara", desc: "Pancetta, Ei, Pecorino, schwarzer Pfeffer", price: "Fr. 21.50" }
          ]
        },
        {
          id: "fleisch",
          title: "Fleisch",
          image: "assets/images/speisekarte/carni.png",
          items: [
            { name: "Saltimbocca alla Romana", desc: "Kalbsschnitzel mit Salbei und Parmaschinken", price: "Fr. 34.50" },
            { name: "Tagliata di Manzo", desc: "Gegrilltes Rindsentrecôte, Rucola, Parmesan", price: "Fr. 38.50" },
            { name: "Pollo alla Parmigiana", desc: "Paniertes Hähnchen mit Tomatensauce und Mozzarella", price: "Fr. 28.50" },
            { name: "Filetto di Maiale", desc: "Schweinsfilet mit Kräutern und Rosmarin", price: "Fr. 32.50" }
          ]
        },
        {
          id: "fisch",
          title: "Fisch",
          image: "assets/images/speisekarte/fish.png",
          items: [
            { name: "Branzino al Forno", desc: "Ofengebackener Wolfsbarsch mit Zitronen-Kräutern", price: "Fr. 36.50" },
            { name: "Gamberi all'Aglio", desc: "Riesengarnelen in Knoblauch-Olivenöl-Sauce", price: "Fr. 34.50" },
            { name: "Salmone Griglia", desc: "Gegrillter Lachs mit Kapern-Tomatensauce", price: "Fr. 32.50" }
          ]
        },
        {
          id: "suppen",
          title: "Suppen",
          image: "assets/images/speisekarte/Suppe-new.png",
          items: [
            { name: "Minestrone Maison", desc: "Hausgemachte Gemüsesuppe", price: "Fr. 8.50" },
            { name: "Tomatencrèmesuppe", desc: "Cremige Tomatensuppe mit Basilikum", price: "Fr. 8.00" },
            { name: "Bouillon mit Ei", desc: "Klare Bouillon mit pochiertem Ei", price: "Fr. 8.00" },
            { name: "Tortelloni in Brodo", desc: "Hausgemachte Tortelloni in Fleischbrühe", price: "Fr. 8.50" }
          ]
        },
        {
          id: "salate",
          title: "Salate",
          image: "assets/images/speisekarte/ceaser salad.png",
          items: [
            { name: "Insalata Mista", desc: "Gemischter Salat mit Hausdressing", price: "Fr. 9.00" },
            { name: "Insalata Caprese", desc: "Tomaten, Mozzarella, Basilikum, Olivenöl", price: "Fr. 14.50" },
            { name: "Rucola e Parmigiano", desc: "Rucola, Parmesanspäne, Kirschtomaten", price: "Fr. 15.50" },
            { name: "Caesar Salat", desc: "Römersalat, Parmesan, Croutons, Caesar-Dressing", price: "Fr. 16.50" }
          ]
        },
        {
          id: "antipasti",
          title: "Vorspeisen",
          image: "assets/images/speisekarte/vorspeise.png",
          items: [
            { name: "Antipasto Misto", desc: "Gemischte italienische Vorspeisen", price: "Fr. 18.50" },
            { name: "Carpaccio di Manzo", desc: "Hauchdünnes Rindfleisch, Rucola, Parmesan", price: "Fr. 19.50" },
            { name: "Bruschetta al Pomodoro", desc: "Geröstetes Brot mit Tomaten und Basilikum", price: "Fr. 9.50" },
            { name: "Burrata con Prosciutto", desc: "Frische Burrata mit Parmaschinken", price: "Fr. 21.00" }
          ]
        },
        {
          id: "dolci",
          title: "Dessert",
          image: "assets/images/speisekarte/tiramisu-dessert.png",
          items: [
            { name: "Tiramisù", desc: "Klassisches hausgemachtes Tiramisù", price: "Fr. 9.50" },
            { name: "Panna Cotta", desc: "Mit Beerencoulis", price: "Fr. 9.00" },
            { name: "Gelato Artigianale", desc: "3 Kugeln hausgemachtes Eis nach Wahl", price: "Fr. 8.50" },
            { name: "Torta della Casa", desc: "Haustorte des Tages", price: "Fr. 8.50" }
          ]
        }
      ]
    },
    getraenkkarte: {
      categories: [
        {
          id: "aperitivo",
          image: "assets/images/Getränke/Aperol Spritz.png",
          title: "Aperitivo",
          items: [
            { name: "Aperol Spritz", desc: "Aperol, Prosecco, Soda", price: "Fr. 12.00" },
            { name: "Campari Soda", desc: "Campari mit Soda", price: "Fr. 11.00" },
            { name: "Hugo", desc: "Holunderblütensirup, Prosecco, Minze", price: "Fr. 12.00" },
            { name: "Prosecco", desc: "Glas 1dl", price: "Fr. 7.50" }
          ]
        },
        {
          id: "weine",
          image: "assets/images/Getränke/Vino della Casa Bianco.png",
          title: "Weine",
          items: [
            { name: "Vino della Casa Bianco", desc: "Hauswein weiss, 1dl", price: "Fr. 5.50" },
            { name: "Vino della Casa Rosso", desc: "Hauswein rot, 1dl", price: "Fr. 5.50" },
            { name: "Pinot Grigio", desc: "Venetien, 1dl", price: "Fr. 7.00" },
            { name: "Chianti Classico", desc: "Toskana, 1dl", price: "Fr. 8.50" },
            { name: "Barolo", desc: "Piemont, Flasche 7dl", price: "Fr. 58.00" }
          ]
        },
        {
          id: "bier",
          image: "assets/images/Getränke/Bier vom Fass.png",
          title: "Bier",
          items: [
            { name: "Bier vom Fass", desc: "0.3 lt", price: "Fr. 4.50" },
            { name: "Bier vom Fass", desc: "0.5 lt", price: "Fr. 6.50" },
            { name: "Nastro Azzurro", desc: "Flasche 0.33 lt", price: "Fr. 5.50" },
            { name: "Peroni", desc: "Flasche 0.33 lt", price: "Fr. 5.50" }
          ]
        },
        {
          id: "mineral",
          image: "assets/images/Getränke/Hausgemachter Zitronensirup.png",
          title: "Mineralwasser",
          items: [
            { name: "Hausgemachter Zitronensirup", desc: "Mit Mineralwasser", price: "Fr. 4.50" },
            { name: "Mineral still", desc: "5dl Flasche", price: "Fr. 4.00" },
            { name: "Mineral prickelnd", desc: "5dl Flasche", price: "Fr. 4.00" },
            { name: "Mineral Offenausschank", desc: "2dl", price: "Fr. 3.00" }
          ]
        },
        {
          id: "kaffee",
          image: "assets/images/Getränke/Espresso.png",
          title: "Kaffee",
          items: [
            { name: "Espresso", desc: "Einzeln", price: "Fr. 3.50" },
            { name: "Caffè Latte", desc: "Grosser Kaffee mit Milch", price: "Fr. 5.00" },
            { name: "Cappuccino", desc: "Espresso mit aufgeschäumter Milch", price: "Fr. 4.50" },
            { name: "Tee", desc: "Verschiedene Sorten", price: "Fr. 4.00" }
          ]
        }
      ]
    },
    aktuell: {
      title: "Aktuell",
      subtitle: "Saisonale Spezialitäten",
      items: [
        {
          name: "Kalbsleber nach Mailänder Art",
          desc: "Kalbsleber mit Salbei, Butter, Salbeibutter und Risotto alla Milanese. Ein klassisches norditalienisches Gericht, das von unserer Küche mit größter Sorgfalt zubereitet wird.",
          price: "Fr. 36.50",
          tag: "Chef's Empfehlung"
        },
        {
          name: "Poulet Cordon Bleu",
          desc: "Hausgemachtes Poulet Cordon Bleu gefüllt mit Käse und Schinken, serviert mit Pommes Frites und saisonalem Gemüse.",
          price: "Fr. 28.50",
          tag: "Klassiker"
        },
        {
          name: "Rösti Spezialitäten",
          desc: "Knusprige Rösti aus dem Haus, serviert mit cremiger Gorgonzolasauce und gerösteten Speckwürfeln.",
          price: "Fr. 24.50",
          tag: "Schweizer Tradition"
        },
        {
          name: "Nüsslisalat mit Speck",
          desc: "Zarter Nüsslisalat mit knusprigem Speck, Croutons und warmem Speckdressing.",
          price: "Fr. 18.50",
          tag: "Saisonal"
        }
      ]
    },
    tagesmenue: {
      title: "Tagesmenü",
      subtitle: "Montag – Freitag · 10:00–14:00 Uhr",
      note: "Alle Tagesmenüs beinhalten Suppe oder Salat, Hauptgericht und Dessert oder Kaffee.",
      menus: [
        {
          label: "Menü 1",
          price: "Fr. 17.50",
          items: ["Tagessuppe", "Pasta del Giorno", "Kaffee"]
        },
        {
          label: "Menü 2",
          price: "Fr. 20.50",
          items: ["Gemischter Salat", "Pizza Margherita", "Dessert des Tages"]
        },
        {
          label: "Menü 3",
          price: "Fr. 24.50",
          items: ["Tagessuppe", "Fleisch/Fisch des Tages mit Beilage", "Dessert des Tages"]
        },
        {
          label: "Menü 4",
          price: "Fr. 27.50",
          items: ["Gemischter Salat", "Premium-Hauptgericht des Tages", "Dessert & Kaffee"]
        }
      ]
    }
  },
  en: {
    speisekarte: {
      categories: [
        {
          id: "pizza",
          title: "Pizza",
          image: "assets/images/speisekarte/Margherita.png",
          items: [
            { name: "Margherita", desc: "Tomato sauce, mozzarella, basil", price: "Fr. 16.50" },
            { name: "Napoli", desc: "Tomato sauce, mozzarella, anchovies, capers", price: "Fr. 18.50" },
            { name: "Quattro Stagioni", desc: "Mozzarella, mushrooms, ham, artichoke, olives", price: "Fr. 21.50" },
            { name: "Diavola", desc: "Tomato sauce, mozzarella, spicy salami", price: "Fr. 20.50" },
            { name: "Prosciutto e Funghi", desc: "Tomato sauce, mozzarella, ham, mushrooms", price: "Fr. 21.00" },
            { name: "Trapez Speciale", desc: "House special with gorgonzola, pear, walnuts", price: "Fr. 23.50" },
            { name: "Vegetariana", desc: "Seasonal vegetables, mozzarella, pesto", price: "Fr. 20.50" },
            { name: "Calzone", desc: "Stuffed pizza with ham, mozzarella, ricotta", price: "Fr. 22.50" }
          ]
        },
        {
          id: "pasta",
          title: "Pasta",
          image: "assets/images/speisekarte/pasta.png",
          items: [
            { name: "Spaghetti Bolognese", desc: "Classic meat sauce from house recipe", price: "Fr. 19.50" },
            { name: "Penne all'Arrabbiata", desc: "Spicy tomato sauce with garlic", price: "Fr. 17.50" },
            { name: "Tagliatelle al Tartufo", desc: "Fresh pasta with black truffle sauce", price: "Fr. 26.50" },
            { name: "Gnocchi al Gorgonzola", desc: "Homemade gnocchi with gorgonzola sauce", price: "Fr. 22.50" },
            { name: "Ravioli Spinaci", desc: "Stuffed ravioli with spinach and ricotta", price: "Fr. 21.50" },
            { name: "Spaghetti Carbonara", desc: "Pancetta, egg, pecorino, black pepper", price: "Fr. 21.50" }
          ]
        },
        {
          id: "fleisch",
          title: "Meat",
          image: "assets/images/speisekarte/carni.png",
          items: [
            { name: "Saltimbocca alla Romana", desc: "Veal escalope with sage and Parma ham", price: "Fr. 34.50" },
            { name: "Tagliata di Manzo", desc: "Grilled beef sirloin, rocket, parmesan", price: "Fr. 38.50" },
            { name: "Chicken Parmigiana", desc: "Breaded chicken with tomato sauce and mozzarella", price: "Fr. 28.50" },
            { name: "Pork Tenderloin", desc: "Pork fillet with herbs and rosemary", price: "Fr. 32.50" }
          ]
        },
        {
          id: "fisch",
          title: "Fish",
          image: "assets/images/speisekarte/fish.png",
          items: [
            { name: "Baked Sea Bass", desc: "Oven-baked sea bass with lemon and herbs", price: "Fr. 36.50" },
            { name: "Gamberi all'Aglio", desc: "King prawns in garlic olive oil sauce", price: "Fr. 34.50" },
            { name: "Grilled Salmon", desc: "With caper and tomato sauce", price: "Fr. 32.50" }
          ]
        },
        {
          id: "suppen",
          title: "Soups",
          image: "assets/images/speisekarte/Suppe-new.png",
          items: [
            { name: "Minestrone Maison", desc: "Homemade vegetable soup", price: "Fr. 8.50" },
            { name: "Cream of Tomato", desc: "Creamy tomato soup with basil", price: "Fr. 8.00" },
            { name: "Bouillon with Egg", desc: "Clear broth with poached egg", price: "Fr. 8.00" },
            { name: "Tortelloni in Brodo", desc: "Homemade tortelloni in meat broth", price: "Fr. 8.50" }
          ]
        },
        {
          id: "salate",
          title: "Salads",
          image: "assets/images/speisekarte/ceaser salad.png",
          items: [
            { name: "Mixed Salad", desc: "Mixed greens with house dressing", price: "Fr. 9.00" },
            { name: "Caprese", desc: "Tomatoes, mozzarella, basil, olive oil", price: "Fr. 14.50" },
            { name: "Rucola & Parmesan", desc: "Rocket, parmesan shavings, cherry tomatoes", price: "Fr. 15.50" },
            { name: "Caesar Salad", desc: "Romaine, parmesan, croutons, caesar dressing", price: "Fr. 16.50" }
          ]
        },
        {
          id: "antipasti",
          title: "Starters",
          image: "assets/images/speisekarte/vorspeise.png",
          items: [
            { name: "Antipasto Misto", desc: "Mixed Italian starters", price: "Fr. 18.50" },
            { name: "Beef Carpaccio", desc: "Paper-thin beef, rocket, parmesan", price: "Fr. 19.50" },
            { name: "Bruschetta al Pomodoro", desc: "Toasted bread with tomatoes and basil", price: "Fr. 9.50" },
            { name: "Burrata & Prosciutto", desc: "Fresh burrata with Parma ham", price: "Fr. 21.00" }
          ]
        },
        {
          id: "dolci",
          title: "Desserts",
          image: "assets/images/speisekarte/tiramisu-dessert.png",
          items: [
            { name: "Tiramisù", desc: "Classic homemade tiramisù", price: "Fr. 9.50" },
            { name: "Panna Cotta", desc: "With berry coulis", price: "Fr. 9.00" },
            { name: "Artisan Ice Cream", desc: "3 scoops of homemade ice cream", price: "Fr. 8.50" },
            { name: "House Cake", desc: "Chef's cake of the day", price: "Fr. 8.50" }
          ]
        }
      ]
    },
    getraenkkarte: {
      categories: [
        {
          id: "aperitivo",
          image: "assets/images/Getränke/Aperol Spritz.png",
          title: "Aperitivo",
          items: [
            { name: "Aperol Spritz", desc: "Aperol, Prosecco, Soda", price: "Fr. 12.00" },
            { name: "Campari Soda", desc: "Campari with soda water", price: "Fr. 11.00" },
            { name: "Hugo", desc: "Elderflower syrup, Prosecco, mint", price: "Fr. 12.00" },
            { name: "Prosecco", desc: "Glass 1dl", price: "Fr. 7.50" }
          ]
        },
        {
          id: "weine",
          image: "assets/images/Getränke/Vino della Casa Bianco.png",
          title: "Wines",
          items: [
            { name: "House White Wine", desc: "1dl", price: "Fr. 5.50" },
            { name: "House Red Wine", desc: "1dl", price: "Fr. 5.50" },
            { name: "Pinot Grigio", desc: "Veneto, 1dl", price: "Fr. 7.00" },
            { name: "Chianti Classico", desc: "Tuscany, 1dl", price: "Fr. 8.50" },
            { name: "Barolo", desc: "Piedmont, bottle 7dl", price: "Fr. 58.00" }
          ]
        },
        {
          id: "bier",
          image: "assets/images/Getränke/Bier vom Fass.png",
          title: "Beer",
          items: [
            { name: "Draft Beer", desc: "0.3 lt", price: "Fr. 4.50" },
            { name: "Draft Beer", desc: "0.5 lt", price: "Fr. 6.50" },
            { name: "Nastro Azzurro", desc: "Bottle 0.33 lt", price: "Fr. 5.50" },
            { name: "Peroni", desc: "Bottle 0.33 lt", price: "Fr. 5.50" }
          ]
        },
        {
          id: "mineral",
          image: "assets/images/Getränke/Hausgemachter Zitronensirup.png",
          title: "Water & Soft Drinks",
          items: [
            { name: "House Lemonade", desc: "With mineral water", price: "Fr. 4.50" },
            { name: "Still Water", desc: "5dl bottle", price: "Fr. 4.00" },
            { name: "Sparkling Water", desc: "5dl bottle", price: "Fr. 4.00" },
            { name: "Mineral Water", desc: "2dl", price: "Fr. 3.00" }
          ]
        },
        {
          id: "kaffee",
          image: "assets/images/Getränke/Espresso.png",
          title: "Coffee & Tea",
          items: [
            { name: "Espresso", desc: "Single shot", price: "Fr. 3.50" },
            { name: "Caffè Latte", desc: "Large coffee with milk", price: "Fr. 5.00" },
            { name: "Cappuccino", desc: "Espresso with steamed milk foam", price: "Fr. 4.50" },
            { name: "Tea", desc: "Various flavours", price: "Fr. 4.00" }
          ]
        }
      ]
    },
    aktuell: {
      title: "Specials",
      subtitle: "Seasonal Highlights",
      items: [
        {
          name: "Veal Liver Milanese Style",
          desc: "Veal liver with sage butter and Risotto alla Milanese. A classic northern Italian dish prepared with the utmost care by our kitchen.",
          price: "Fr. 36.50",
          tag: "Chef's Recommendation"
        },
        {
          name: "Chicken Cordon Bleu",
          desc: "Homemade chicken Cordon Bleu stuffed with cheese and ham, served with fries and seasonal vegetables.",
          price: "Fr. 28.50",
          tag: "Classic"
        },
        {
          name: "Rösti Speciality",
          desc: "Crispy homemade Rösti served with creamy gorgonzola sauce and roasted bacon cubes.",
          price: "Fr. 24.50",
          tag: "Swiss Tradition"
        },
        {
          name: "Lamb's Lettuce with Bacon",
          desc: "Tender lamb's lettuce with crispy bacon, croutons and warm bacon dressing.",
          price: "Fr. 18.50",
          tag: "Seasonal"
        }
      ]
    },
    tagesmenue: {
      title: "Daily Menu",
      subtitle: "Monday – Friday · 10:00 AM – 2:00 PM",
      note: "All daily menus include soup or salad, main course and dessert or coffee.",
      menus: [
        {
          label: "Menu 1",
          price: "Fr. 17.50",
          items: ["Soup of the day", "Pasta del Giorno", "Coffee"]
        },
        {
          label: "Menu 2",
          price: "Fr. 20.50",
          items: ["Mixed salad", "Pizza Margherita", "Dessert of the day"]
        },
        {
          label: "Menu 3",
          price: "Fr. 24.50",
          items: ["Soup of the day", "Meat/Fish of the day with sides", "Dessert of the day"]
        },
        {
          label: "Menu 4",
          price: "Fr. 27.50",
          items: ["Mixed salad", "Premium main course of the day", "Dessert & Coffee"]
        }
      ]
    }
  }
};

// Translation strings for UI elements
const translations = {
  de: {
    nav: {
      home: "Home",
      angebot: "Angebot",
      reservieren: "Reservieren",
      ambiente: "Ambiente",
      ueberUns: "Über Uns",
      kontakt: "Kontakt"
    },
    hero: {
      tagline: "Authentische Küche. Unvergessliche Momente.",
      subtitle: "Willkommen im Restaurant Trapez — Wo jedes Gericht eine Geschichte erzählt",
      cta1: "Tisch Reservieren",
      cta2: "Speisekarte",
      cta3: "Tagesmenü"
    },
    angebot: {
      title: "Unser Angebot",
      tabs: {
        speisekarte: "Speisekarte",
        getraenkkarte: "Getränkkarte",
        aktuell: "Aktuell",
        tagesmenue: "Tagesmenü"
      }
    },
    reservieren: {
      title: "Tisch Reservieren",
      subtitle: "Wir freuen uns auf Ihren Besuch. Reservieren Sie jetzt Ihren Tisch.",
      fullname: "Vollständiger Name",
      phone: "Telefonnummer",
      email: "E-Mail Adresse",
      guests: "Anzahl Gäste",
      date: "Datum",
      time: "Uhrzeit",
      message: "Besondere Wünsche (optional)",
      button: "Jetzt Reservieren",
      note: "Sie erhalten eine Bestätigung per E-Mail.",
      required: "Pflichtfeld"
    },
    ambiente: {
      title: "Ambiente",
      subtitle: "Tauchen Sie ein in die warme, elegante Atmosphäre unseres Restaurants"
    },
    ueberUns: {
      title: "Über Uns",
      subtitle: "Unsere Geschichte",
      text1: "Das Restaurant Trapez ist seit über 10 Jahren eine feste Institution in Reinach. Wir verbinden Schweizer Gastfreundschaft mit authentischer italienischer Küche — frische Zutaten, traditionelle Rezepte und Leidenschaft auf jedem Teller.",
      text2: "Unser Küchenchef kreiert täglich Gerichte, die die besten Aromen Italiens in Ihre Teller bringen. Von klassischen Pizzen aus dem Holzofen bis zu handgemachten Pastagerichten und frischen Fischspezialitäten — bei uns finden Sie für jeden Geschmack das Richtige.",
      text3: "Wir empfangen unsere Gäste jeden Abend mit einem Haus-Aperitif und freuen uns darauf, Ihnen einen unvergesslichen Abend zu bereiten.",
      ownerCaption: "Giuseppe Trapez — Patron & Chef"
    },
    kontakt: {
      title: "Kontakt",
      subtitle: "Wir sind für Sie da",
      address: "Adresse",
      hours: "Öffnungszeiten",
      phone: "Telefon",
      email: "E-Mail",
      hoursDetail: [
        "Montag – Freitag: 10:00 – 14:00 | 17:00 – 23:00",
        "Samstag: 17:00 – 23:00",
        "Sonntag: 17:00 – 22:30"
      ],
      stats: {
        rating: { value: "4.5★", label: "Durchschnittsbewertung" },
        customers: { value: "500+", label: "Zufriedene Gäste" },
        reviews: { value: "250+", label: "Kundenbewertungen" },
        years: { value: "10+", label: "Jahre Erfahrung" }
      },
      reviewsTitle: "Was unsere Gäste sagen",
      reviews: [
        { name: "Stefan Baumann", text: "Sehr gute Küche, freundliches Personal. Mittagsmenü inkl. Dessert und Kaffee – Preis-Leistung sehr gut!", rating: 5 },
        { name: "Edgar Spies", text: "Rundum begeistert! Atmosphäre warm und einladend, freundliches Team. Von knuspriger Pizza bis delikaten Cordon bleu – jeder Biss war ein Genuss. Sehr empfehlenswert!", rating: 5 },
        { name: "Timo Feulner", text: "Absolut bestes Restaurant in Reinach. Grosse Auswahl zu fairen Preisen, super netter Service und immer ein gratis Aperitif. Das selbstgemachte Schoggimousse ist das beste weit und breit!", rating: 5 },
        { name: "Avni Hamiti", text: "Wir haben hier den Geburtstag meines Vaters gefeiert – wir waren wirklich sehr zufrieden und empfehlen es jedem. Ein unglaublicher Tag, danke!", rating: 5 }
      ]
    },
    footer: {
      tagline: "Authentische Küche seit mehr als 10 Jahren",
      copyright: "© 2025 Restaurant Trapez, Reinach. Alle Rechte vorbehalten.",
      legal: "Impressum & Datenschutz"
    },
    loading: {
      text: "Willkommen"
    },
    thankyou: {
      title: "Danke für Ihre Reservierung!",
      text: "Wir freuen uns auf Ihren Besuch. Eine Bestätigung wurde an Ihre E-Mail-Adresse gesendet.",
      back: "Zur Startseite"
    },
    notfound: {
      title: "404",
      subtitle: "Seite nicht gefunden",
      text: "Die gesuchte Seite existiert leider nicht.",
      back: "Zur Startseite"
    }
  },
  en: {
    nav: {
      home: "Home",
      angebot: "Menu",
      reservieren: "Reserve",
      ambiente: "Ambiente",
      ueberUns: "About",
      kontakt: "Contact"
    },
    hero: {
      tagline: "Authentic Cuisine. Unforgettable Moments.",
      subtitle: "Welcome to Restaurant Trapez — Where every dish tells a story",
      cta1: "Reserve a Table",
      cta2: "View Menu",
      cta3: "Daily Menu"
    },
    angebot: {
      title: "Our Menu",
      tabs: {
        speisekarte: "Food Menu",
        getraenkkarte: "Drinks",
        aktuell: "Specials",
        tagesmenue: "Daily Menu"
      }
    },
    reservieren: {
      title: "Reserve a Table",
      subtitle: "We look forward to welcoming you. Book your table now.",
      fullname: "Full Name",
      phone: "Phone Number",
      email: "Email Address",
      guests: "Number of Guests",
      date: "Date",
      time: "Time",
      message: "Special requests (optional)",
      button: "Reserve Now",
      note: "You will receive a confirmation by email.",
      required: "Required field"
    },
    ambiente: {
      title: "Ambiente",
      subtitle: "Immerse yourself in the warm, elegant atmosphere of our restaurant"
    },
    ueberUns: {
      title: "About Us",
      subtitle: "Our Story",
      text1: "Restaurant Trapez has been a cornerstone of Reinach for over 10 years. We blend Swiss hospitality with authentic Italian cuisine — fresh ingredients, traditional recipes and passion on every plate.",
      text2: "Our chef creates dishes daily that bring the best flavours of Italy to your table. From classic wood-fired pizzas to handmade pasta and fresh fish specialities — we have something for every palate.",
      text3: "We welcome our guests every evening with a house aperitif and look forward to giving you an unforgettable evening.",
      ownerCaption: "Giuseppe Trapez — Patron & Chef"
    },
    kontakt: {
      title: "Contact",
      subtitle: "We are here for you",
      address: "Address",
      hours: "Opening Hours",
      phone: "Phone",
      email: "Email",
      hoursDetail: [
        "Monday – Friday: 10:00 – 14:00 | 17:00 – 23:00",
        "Saturday: 17:00 – 23:00",
        "Sunday: 17:00 – 22:30"
      ],
      stats: {
        rating: { value: "4.5★", label: "Average Rating" },
        customers: { value: "500+", label: "Happy Customers" },
        reviews: { value: "250+", label: "Customer Reviews" },
        years: { value: "10+", label: "Years of Service" }
      },
      reviewsTitle: "What Our Guests Say",
      reviews: [
        { name: "Stefan Baumann", text: "Excellent kitchen, friendly staff. Lunch menu including dessert and coffee – great value for money!", rating: 5 },
        { name: "Edgar Spies", text: "Absolutely thrilled! Warm and inviting atmosphere, friendly team. From crispy pizza to exquisite Cordon Bleu – every bite was a delight. Highly recommended!", rating: 5 },
        { name: "Timo Feulner", text: "Absolutely the best restaurant in Reinach. Great selection at fair prices, super friendly service and always a free aperitif. The homemade chocolate mousse is the best around!", rating: 5 },
        { name: "Avni Hamiti", text: "We celebrated my father's birthday here – we were truly very happy and recommend it to everyone. An incredible day, thank you!", rating: 5 }
      ]
    },
    footer: {
      tagline: "Authentic Cuisine for over 10 years",
      copyright: "© 2025 Restaurant Trapez, Reinach. All rights reserved.",
      legal: "Legal Notice & Privacy"
    },
    loading: {
      text: "Welcome"
    },
    thankyou: {
      title: "Thank You for Your Reservation!",
      text: "We look forward to welcoming you. A confirmation has been sent to your email address.",
      back: "Back to Home"
    },
    notfound: {
      title: "404",
      subtitle: "Page Not Found",
      text: "The page you are looking for does not exist.",
      back: "Back to Home"
    }
  }
  ,
  it: {
    nav: {
      home: "Home",
      angebot: "Menu",
      reservieren: "Prenota",
      ambiente: "Ambiente",
      ueberUns: "Chi Siamo",
      kontakt: "Contatti"
    },
    hero: {
      tagline: "Cucina autentica. Momenti indimenticabili.",
      subtitle: "Benvenuti al Ristorante Trapez — Dove ogni piatto racconta una storia",
      cta1: "Prenota un Tavolo",
      cta2: "Menu",
      cta3: "Menu del Giorno"
    },
    angebot: {
      title: "Il Nostro Menu",
      tabs: {
        speisekarte: "Menu",
        getraenkkarte: "Bevande",
        aktuell: "Speciali",
        tagesmenue: "Menu del Giorno"
      }
    },
    reservieren: {
      title: "Prenota un Tavolo",
      subtitle: "Siamo lieti di accogliervi. Prenota il tuo tavolo ora.",
      fullname: "Nome Completo",
      phone: "Telefono",
      email: "Indirizzo Email",
      guests: "Numero di Ospiti",
      date: "Data",
      time: "Orario",
      message: "Richieste speciali (opzionale)",
      button: "Prenota Ora",
      note: "Riceverai una conferma via email.",
      required: "Campo obbligatorio"
    },
    ambiente: {
      title: "Ambiente",
      subtitle: "Immergetevi nell'atmosfera calda ed elegante del nostro ristorante"
    },
    ueberUns: {
      title: "Chi Siamo",
      subtitle: "La Nostra Storia",
      text1: "Il Ristorante Trapez è da oltre 10 anni un punto di riferimento a Reinach. Uniamo l'ospitalità svizzera alla cucina italiana autentica — ingredienti freschi, ricette tradizionali e passione in ogni piatto.",
      text2: "Il nostro chef crea ogni giorno piatti che portano i migliori sapori d'Italia sulla vostra tavola. Dalle classiche pizze cotte nel forno a legna alla pasta fatta a mano e alle specialità di pesce fresco.",
      text3: "Accogliamo i nostri ospiti ogni sera con un aperitivo della casa e ci impegniamo a regalarvi una serata indimenticabile.",
      ownerCaption: "Giuseppe Trapez — Patron & Chef"
    },
    kontakt: {
      title: "Contatti",
      subtitle: "Siamo qui per voi",
      address: "Indirizzo",
      hours: "Orari di Apertura",
      phone: "Telefono",
      email: "Email",
      hoursDetail: [
        "Lunedì – Venerdì: 10:00 – 14:00 | 17:00 – 23:00",
        "Sabato: 17:00 – 23:00",
        "Domenica: 17:00 – 22:30"
      ],
      stats: {
        rating: { value: "4.5★", label: "Valutazione Media" },
        customers: { value: "500+", label: "Ospiti Soddisfatti" },
        reviews: { value: "250+", label: "Recensioni" },
        years: { value: "10+", label: "Anni di Esperienza" }
      },
      reviewsTitle: "Cosa dicono i nostri ospiti",
      reviews: [
        { name: "Stefan Baumann", text: "Cucina eccellente, personale cordiale. Menu del pranzo con dessert e caffè – ottimo rapporto qualità-prezzo!", rating: 5 },
        { name: "Edgar Spies", text: "Assolutamente entusiasta! Atmosfera calda e accogliente, team amichevole. Dalla pizza croccante al delizioso Cordon Bleu – ogni boccone era una delizia. Consigliato vivamente!", rating: 5 },
        { name: "Timo Feulner", text: "Assolutamente il miglior ristorante di Reinach. Grande scelta a prezzi equi, servizio super cordiale e sempre un aperitivo in omaggio. La mousse al cioccolato fatta in casa è la migliore in assoluto!", rating: 5 },
        { name: "Avni Hamiti", text: "Abbiamo festeggiato il compleanno di mio padre qui – eravamo davvero molto soddisfatti e lo consigliamo a tutti. Una giornata incredibile, grazie!", rating: 5 }
      ]
    },
    footer: {
      tagline: "Cucina autentica da oltre 10 anni",
      copyright: "© 2025 Restaurant Trapez, Reinach. Tutti i diritti riservati.",
      legal: "Note Legali & Privacy"
    },
    loading: { text: "Benvenuti" },
    thankyou: {
      title: "Grazie per la sua prenotazione!",
      text: "Non vediamo l'ora di accogliervi. Una conferma è stata inviata al vostro indirizzo email.",
      back: "Torna alla Home"
    },
    notfound: {
      title: "Ops! Questa pagina non esiste.",
      text: "La pagina che stai cercando non è stata trovata.",
      back: "Torna alla Home"
    }
  },
  fr: {
    nav: {
      home: "Accueil",
      angebot: "Menu",
      reservieren: "Réserver",
      ambiente: "Ambiance",
      ueberUns: "À Propos",
      kontakt: "Contact"
    },
    hero: {
      tagline: "Cuisine authentique. Moments inoubliables.",
      subtitle: "Bienvenue au Restaurant Trapez — Où chaque plat raconte une histoire",
      cta1: "Réserver une Table",
      cta2: "Voir la Carte",
      cta3: "Menu du Jour"
    },
    angebot: {
      title: "Notre Menu",
      tabs: {
        speisekarte: "Carte",
        getraenkkarte: "Boissons",
        aktuell: "Spécialités",
        tagesmenue: "Menu du Jour"
      }
    },
    reservieren: {
      title: "Réserver une Table",
      subtitle: "Nous vous attendons avec impatience. Réservez votre table maintenant.",
      fullname: "Nom Complet",
      phone: "Numéro de Téléphone",
      email: "Adresse Email",
      guests: "Nombre de Convives",
      date: "Date",
      time: "Heure",
      message: "Demandes spéciales (optionnel)",
      button: "Réserver Maintenant",
      note: "Vous recevrez une confirmation par email.",
      required: "Champ obligatoire"
    },
    ambiente: {
      title: "Ambiance",
      subtitle: "Plongez dans l'atmosphère chaleureuse et élégante de notre restaurant"
    },
    ueberUns: {
      title: "À Propos",
      subtitle: "Notre Histoire",
      text1: "Le Restaurant Trapez est depuis plus de 10 ans une institution à Reinach. Nous allions l'hospitalité suisse à la cuisine italienne authentique — ingrédients frais, recettes traditionnelles et passion dans chaque assiette.",
      text2: "Notre chef crée chaque jour des plats qui apportent les meilleures saveurs d'Italie à votre table. Des pizzas classiques au feu de bois aux pâtes fraîches maison et spécialités de poisson.",
      text3: "Nous accueillons nos hôtes chaque soir avec un apéritif maison et nous réjouissons de vous offrir une soirée inoubliable.",
      ownerCaption: "Giuseppe Trapez — Patron & Chef"
    },
    kontakt: {
      title: "Contact",
      subtitle: "Nous sommes là pour vous",
      address: "Adresse",
      hours: "Horaires d'Ouverture",
      phone: "Téléphone",
      email: "Email",
      hoursDetail: [
        "Lundi – Vendredi : 10h00 – 14h00 | 17h00 – 23h00",
        "Samedi : 17h00 – 23h00",
        "Dimanche : 17h00 – 22h30"
      ],
      stats: {
        rating: { value: "4.5★", label: "Note Moyenne" },
        customers: { value: "500+", label: "Clients Satisfaits" },
        reviews: { value: "250+", label: "Avis Clients" },
        years: { value: "10+", label: "Ans d'Expérience" }
      },
      reviewsTitle: "Ce que disent nos clients",
      reviews: [
        { name: "Stefan Baumann", text: "Excellente cuisine, personnel amical. Menu du midi avec dessert et café – très bon rapport qualité-prix !", rating: 5 },
        { name: "Edgar Spies", text: "Absolument ravi ! Atmosphère chaleureuse et accueillante, équipe sympathique. De la pizza croustillante au délicieux Cordon Bleu – chaque bouchée était un régal. Fortement recommandé !", rating: 5 },
        { name: "Timo Feulner", text: "Absolument le meilleur restaurant de Reinach. Grand choix à des prix équitables, service très sympathique et toujours un apéritif offert. La mousse au chocolat maison est la meilleure !", rating: 5 },
        { name: "Avni Hamiti", text: "Nous avons fêté l'anniversaire de mon père ici – nous étions vraiment très satisfaits et le recommandons à tous. Une journée incroyable, merci !", rating: 5 }
      ]
    },
    footer: {
      tagline: "Cuisine authentique depuis plus de 10 ans",
      copyright: "© 2025 Restaurant Trapez, Reinach. Tous droits réservés.",
      legal: "Mentions Légales & Confidentialité"
    },
    loading: { text: "Bienvenue" },
    thankyou: {
      title: "Merci pour votre réservation !",
      text: "Nous nous réjouissons de votre visite. Une confirmation a été envoyée à votre adresse email.",
      back: "Retour à l'Accueil"
    },
    notfound: {
      title: "Oups ! Cette page n'existe pas.",
      text: "La page que vous recherchez est introuvable.",
      back: "Retour à l'Accueil"
    }
  }
};