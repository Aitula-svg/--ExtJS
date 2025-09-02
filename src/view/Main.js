// Ext.define("MyApp.view.Main", {
//   extend: "Ext.panel.Panel",
//   alias: "widget.mainpanel",

//   requires: ["MyApp.view.ProductGrid"],

//   title: "Учет товаров",
//   layout: "fit",
//   width: "100%",
//   height: "100%",

//   
//   dockedItems: [
//     {
//       xtype: "toolbar",
//       dock: "top",
//       items: [
//         {
//           text: "Товары",
//           handler: function () {
//             const tabPanel = Ext.getCmp("main-tabpanel");
//             const tabCount = tabPanel.items.length + 1;

//             // Создаем новую вкладку с гридом товаров
//             const newTab = tabPanel.add({
//               title: "Товары " + tabCount,
//               closable: true,
//               layout: "fit",
//               items: [
//                 {
//                   xtype: "productgrid",
//                   listeners: {
//                     openproductcard: function (record) {
//                       openProductCard(record);
//                     },
//                   },
//                 },
//               ],
//             });

//             
//             tabPanel.setActiveTab(newTab);
//           },
//         },
//         "->",
//         {
//           text: "Выход",
//           handler: function () {
//             Ext.Msg.confirm(
//               "Выход",
//               "Вы уверены, что хотите выйти?",
//               function (choice) {
//                 if (choice === "yes") {
//                   const mainPanel = Ext.ComponentQuery.query("mainpanel")[0];
//                   if (mainPanel) {
//                     mainPanel.destroy();
//                   }

//                   const loginWindow = Ext.getCmp("login-window");
//                   if (loginWindow) {
//                     loginWindow.show();
//                     loginWindow.down("textfield[name=username]").setValue("");
//                     loginWindow.down("textfield[name=password]").setValue("");
//                   }
//                 }
//               }
//             );
//           },
//         },
//       ],
//     },
//   ],

//   
//   items: [
//     {
//       xtype: "tabpanel",
//       id: "main-tabpanel",
//       activeTab: 0,
//       items: [
//         {
//           title: "Добро пожаловать",
//           html: '<div style="padding: 20px; text-align: center;"><h1>Добро пожаловать в систему учета товаров!</h1><p>Нажмите кнопку "Товары" чтобы начать работу</p></div>',
//         },
//       ],
//     },
//   ],
// });


// function openProductCard(record) {
//   Ext.Msg.alert(
//     "Карточка товара",
//     "Открываем карточку для: " + record.get("name")
//   );
//   // Здесь будет код для открытия окна редактирования
// }
