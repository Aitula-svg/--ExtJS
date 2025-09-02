Ext.onReady(function () {
  console.log("ExtJS загружен и готов к работе!");

  let loginWindow;
  let mainPanel;

  const productsData = [
    {
      id: 1,
      name: "Notebook Lenovo",
      description: 'Ноутбук ThinkPad T460 14" FHD',
      price: 100.5,
      quantity: 2,
    },
    {
      id: 2,
      name: "Keyboard OKLICK",
      description: "Клавиатура OKLICK 140M, US",
      price: 50.0,
      quantity: 8,
    },
    {
      id: 3,
      name: "Network adapter",
      description: "Сетевой адаптер WiFi D-Link",
      price: 7.0,
      quantity: 0,
    },
    {
      id: 4,
      name: "Monitor Samsung",
      description: 'Монитор 24" Samsung LF24T350',
      price: 150.0,
      quantity: 5,
    },
    {
      id: 5,
      name: "Webcam HD",
      description: "Веб-камера 1080p с микрофоном",
      price: 35.9,
      quantity: 3,
    },
  ];

  const productsStore = Ext.create("Ext.data.Store", {
    fields: ["id", "name", "description", "price", "quantity"],
    data: productsData,
    sorters: [{ property: "id", direction: "ASC" }],
  });

  function applyFilters(grid) {
    const idFilter = grid.down("textfield[name=idFilter]").getValue();
    const descFilter = grid.down("textfield[name=descFilter]").getValue();
    const store = grid.getStore();

    store.clearFilter();

    const filters = [];

    if (idFilter) {
      filters.push({
        property: "id",
        value: parseInt(idFilter),
        exactMatch: true,
      });
    }

    if (descFilter) {
      filters.push({
        property: "description",
        value: descFilter,
        anyMatch: true,
      });
    }

    if (filters.length > 0) {
      store.addFilter(filters);
    }
  }

  function openProductCard(record) {
    const cardWindow = Ext.create("Ext.window.Window", {
      title: "Карточка товара: " + record.get("name"),
      width: 500,
      height: 400,
      modal: true,
      layout: "fit",

      dockedItems: [
        {
          xtype: "panel",
          dock: "top",
          bodyPadding: 10,
          style: {
            borderBottom: "1px solid #ccc",
            background: "#f5f5f5",
          },
          items: [
            {
              xtype: "fieldcontainer",
              layout: "hbox",
              fieldLabel: "Фильтры",
              labelWidth: 50,
              defaults: {
                margin: "0 10 0 0",
              },
              items: [
                {
                  xtype: "textfield",
                  fieldLabel: "ID",
                  name: "idFilter",
                  emptyText: "Введите ID...",
                  labelWidth: 25,
                  width: 150,
                  listeners: {
                    specialkey: function (field, e) {
                      if (e.getKey() === e.ENTER) {
                        applyFilters(field.up("gridpanel"));
                      }
                    },
                  },
                },
                {
                  xtype: "textfield",
                  fieldLabel: "Описание",
                  name: "descFilter",
                  emptyText: "Введите текст...",
                  labelWidth: 60,
                  width: 250,
                  listeners: {
                    specialkey: function (field, e) {
                      if (e.getKey() === e.ENTER) {
                        applyFilters(field.up("gridpanel"));
                      }
                    },
                  },
                },
                {
                  xtype: "button",
                  text: "Очистить",
                  handler: function () {
                    const grid = this.up("gridpanel");
                    grid.down("textfield[name=idFilter]").setValue("");
                    grid.down("textfield[name=descFilter]").setValue("");
                    grid.getStore().clearFilter();
                  },
                },
              ],
            },
          ],
        },
      ],

      buttons: [
        {
          text: "Отмена",
          handler: function () {
            this.up("window").close();
          },
        },
        {
          text: "Сохранить",
          handler: function () {
            const window = this.up("window");
            const form = window.down("form");
            const record = window.record;
            const values = form.getValues();

            const newPrice = parseFloat(values.price);
            const newQuantity = parseInt(values.quantity);

            if (
              record.get("price") !== newPrice ||
              record.get("quantity") !== newQuantity
            ) {
              Ext.Msg.confirm(
                "Сохранение",
                "Сохранить изменения?",
                function (choice) {
                  if (choice === "yes") {
                    record.set({
                      price: newPrice,
                      quantity: newQuantity,
                    });
                    window.close();
                    Ext.Msg.alert("Успех", "Данные сохранены!");
                  }
                }
              );
            } else {
              window.close();
            }
          },
        },
      ],
    });

    cardWindow.record = record;
    cardWindow.show();
  }

  function createProductGrid() {
    return Ext.create("Ext.grid.Panel", {
      title: "Список товаров",
      store: productsStore,

      dockedItems: [
        {
          xtype: "toolbar",
          dock: "top",
          items: [
            {
              fieldLabel: "ID",
              xtype: "textfield",
              name: "idFilter",
              emptyText: "Введите ID...",
              width: 200,
              listeners: {
                specialkey: function (field, e) {
                  if (e.getKey() === e.ENTER) {
                    applyFilters(field.up("gridpanel"));
                  }
                },
              },
            },
            {
              fieldLabel: "Описание",
              xtype: "textfield",
              name: "descFilter",
              emptyText: "Введите текст...",
              width: 300,
              listeners: {
                specialkey: function (field, e) {
                  if (e.getKey() === e.ENTER) {
                    applyFilters(field.up("gridpanel"));
                  }
                },
              },
            },
            {
              xtype: "button",
              text: "Очистить",
              handler: function () {
                const grid = this.up("gridpanel");
                grid.down("textfield[name=idFilter]").setValue("");
                grid.down("textfield[name=descFilter]").setValue("");
                grid.getStore().clearFilter();
              },
            },
          ],
        },
      ],

      columns: [
        { text: "ID", dataIndex: "id", width: 50 },
        {
          text: "Имя",
          dataIndex: "name",
          width: 150,
          renderer: function (value) {
            return (
              '<span style="color: #1976d2; cursor: pointer; text-decoration: underline;">' +
              value +
              "</span>"
            );
          },
        },
        {
          text: "Описание",
          dataIndex: "description",
          flex: 1,
          renderer: function (value) {
            return value.length > 30 ? value.substring(0, 30) + "..." : value;
          },
        },
        {
          text: "Цена",
          dataIndex: "price",
          width: 80,
          renderer: function (value) {
            return "$" + value.toFixed(2);
          },
        },
        {
          text: "Кол-во",
          dataIndex: "quantity",
          width: 80,
          renderer: function (value, meta) {
            if (value === 0) {
              meta.style = "background: red; font-weight: bold;";
            }
            return value;
          },
        },
      ],

      listeners: {
        cellclick: function (grid, td, cellIndex, record, tr, rowIndex, e) {
          if (cellIndex === 1) {
            openProductCard(record);
          }
        },
      },
    });
  }

  function createMainWindow() {
    if (mainPanel) {
      mainPanel.destroy();
    }

    const container = Ext.getBody().createChild({
      tag: "div",
      style: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      },
    });

    mainPanel = Ext.create("Ext.panel.Panel", {
      title: "Учет товаров",
      renderTo: container,
      layout: "fit",
      width: "100%",
      height: "100%",

      dockedItems: [
        {
          xtype: "toolbar",
          dock: "top",
          items: [
            {
              text: "Товары",
              handler: function () {
                const tabPanel = Ext.getCmp("main-tabpanel");
                const tabCount = tabPanel.items.length + 1;

                const newTab = tabPanel.add({
                  title: "Товары " + tabCount,
                  closable: true,
                  layout: "fit",
                  items: [createProductGrid()],
                });

                tabPanel.setActiveTab(newTab);
              },
            },
            {
              text: "Выход",
              handler: function () {
                Ext.Msg.confirm(
                  "Выход",
                  "Вы уверены, что хотите выйти?",
                  function (choice) {
                    if (choice === "yes") {
                      if (mainPanel) {
                        mainPanel.destroy();
                        mainPanel = null;
                      }

                      const container = Ext.getBody().down("div");
                      if (container) {
                        container.destroy();
                      }

                      if (loginWindow) {
                        loginWindow.show();
                        loginWindow
                          .down("textfield[name=username]")
                          .setValue("");
                        loginWindow
                          .down("textfield[name=password]")
                          .setValue("");
                      }
                    }
                  }
                );
              },
            },
          ],
        },
      ],

      items: [
        {
          xtype: "tabpanel",
          id: "main-tabpanel",
          activeTab: 0,
        },
      ],
    });
  }

  loginWindow = Ext.create("Ext.window.Window", {
    title: "Авторизация",
    id: "login-window",
    closable: false,
    draggable: false,
    resizable: false,
    autoShow: true,
    modal: true,
    bodyPadding: 20,
    width: 400,
    height: 250,

    items: [
      {
        xtype: "textfield",
        fieldLabel: "Логин",
        name: "username",
        allowBlank: false,
        emptyText: "Введите ваш логин",
        margin: "0 0 15 0",
      },
      {
        xtype: "textfield",
        fieldLabel: "Пароль",
        name: "password",
        inputType: "password",
        allowBlank: false,
        emptyText: "Введите ваш пароль",
        margin: "0 0 20 0",
      },
    ],

    buttons: [
      {
        text: "Войти",
        handler: function () {
          const username = this.up("window")
            .down("textfield[name=username]")
            .getValue();
          const password = this.up("window")
            .down("textfield[name=password]")
            .getValue();

          if (username === "admin" && password === "padmin") {
            Ext.Msg.alert("Успех", "Вход выполнен!", function () {
              loginWindow.hide();
              createMainWindow();
            });
          } else {
            Ext.Msg.alert("Ошибка", "Неверный логин или пароль");
          }
        },
      },
    ],
  });
});
