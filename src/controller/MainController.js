Ext.define("MyApp.controller.MainController", {
  extend: "Ext.app.ViewController",
  alias: "controller.main",

  
  onProductsClick: function () {
    const tabPanel = Ext.getCmp("main-tabpanel");
    const tabCount = tabPanel.items.length + 1;

    
    tabPanel.add({
      title: "Товары " + tabCount,
      closable: true,
      html: "Здесь будет список товаров для вкладки " + tabCount,
    });
  },

  
  onLogoutClick: function () {
    Ext.Msg.confirm(
      "Выход",
      "Вы уверены, что хотите выйти?",
      function (choice) {
        if (choice === "yes") {
          
          const mainPanel = Ext.ComponentQuery.query("mainpanel")[0];
          if (mainPanel) {
            mainPanel.destroy();
          }

          
          const loginWindow = Ext.getCmp("login-window");
          if (loginWindow) {
            loginWindow.show();
            loginWindow.down("form").reset();
          }
        }
      }
    );
  },
});
