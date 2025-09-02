// Ext.define("MyApp.view.ProductGrid", {
//   extend: "Ext.grid.Panel",
//   alias: "widget.productgrid",

//   requires: ["MyApp.store.Products"],

//   title: "Список товаров",
//   store: {
//     type: "products",
//   },

//   
//   dockedItems: [
//     {
//       xtype: "toolbar",
//       dock: "top",
//       items: [
//         {
//           fieldLabel: "ID",
//           xtype: "textfield",
//           name: "idFilter",
//           emptyText: "Введите ID...",
//           width: 200,
//           listeners: {
//             specialkey: function (field, e) {
//               if (e.getKey() === e.ENTER) {
//                 applyFilters(this.up("grid"));
//               }
//             },
//           },
//         },
//         {
//           fieldLabel: "Описание",
//           xtype: "textfield",
//           name: "descFilter",
//           emptyText: "Введите текст...",
//           width: 300,
//           listeners: {
//             specialkey: function (field, e) {
//               if (e.getKey() === e.ENTER) {
//                 applyFilters(this.up("grid"));
//               }
//             },
//           },
//         },
//         {
//           xtype: "button",
//           text: "Очистить",
//           handler: function () {
//             const grid = this.up("grid");
//             grid.down("textfield[name=idFilter]").setValue("");
//             grid.down("textfield[name=descFilter]").setValue("");
//             grid.getStore().clearFilter();
//           },
//         },
//       ],
//     },
//   ],


// });


// function applyFilters(grid) {
//   const idFilter = grid.down("textfield[name=idFilter]").getValue();
//   const descFilter = grid.down("textfield[name=descFilter]").getValue();
//   const store = grid.getStore();

//   store.clearFilter();

//   if (idFilter || descFilter) {
//     store.filter([
//       {
//         property: "id",
//         value: idFilter,
//         exactMatch: true,
//       },
//       {
//         property: "description",
//         value: descFilter,
//         anyMatch: true,
//       },
//     ]);
//   }
// }
