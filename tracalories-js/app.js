// Storage Controller

// Item Controller
const ItemCtrl = (function (){
  // item constructor 
  const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  //data Structure
  const data = {
    items: [
      {id: 0, name: "Steak", calories: 450},
      {id: 1, name: "HotDog", calories: 650},
      {id: 2, name: "Burger", calories: 750}
    ],
    currentItem: null,
    totalCalories: 0
  }
  // Public Mehotds
  return {

    getItems: function(){
      return data.items;
    },
    // Create new Item instance
    createItem: function(input){
      let id;
      if(data.items.length > 0){
        id = (data.items.length - 1) + 1;
        newItem = new Item(id, input.name, input.calories);
      } else {
        id = 0;
        newItem = new Item(id, input.name, input.calories);
      }
      data.items.push(newItem);

      return newItem;
    },
    // method use for testing
    logData: function(){
      return data;
    }
  }
})();

// UI controller
const UICtrl = (function (){
  
  // select items
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemName: '#item-name',
    itemCalories: '#item-calories'
  }

  // PUBLIC Mehotds
  return {
   
    // Populate lists
    populateList: function(items){
      let html = '';

      items.forEach(item => {
        html += ` 
        <li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`
      });
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
     // Selectors
     getSelectors: function(){
      return UISelectors;
    },
    // user form input
    getUserInput: function(){
      return  {
        name: document.querySelector(UISelectors.itemName).value,
        calories: document.querySelector(UISelectors.itemCalories).value,
      }      
    }, // Inser new item to DOM.
    addItem: function(item){
      // create the LI with respective class
      const li = document.createElement('li');
      li.className = `collection-item id="item-${item.id}"`
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`
      
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li);

    }

  }

})();

// APP controller
const AppCtrl = (function (ItemCtrl,UICtrl ){
  
  // load event listeners
  const loadEventListeners = function(){
    // Get uiselectors
    const selectors = UICtrl.getSelectors();
        
    // event for add meal button
    document.querySelector(selectors.addBtn).addEventListener('click', addMeal);
    
  }

  const addMeal = function(e){
    
    // get user's input from form.
    const input = UICtrl.getUserInput();
    
    if(input.name !== "" & input.calories !== ""){
      const newItem = ItemCtrl.createItem(input);
      
      // Add new Item to UI
      UICtrl.addItem(newItem);
    }

    e.preventDefault();
  }
  
  // Public Mehotds
  return {
    init: function() {
      // Fetch items from Data Structure
      const items = ItemCtrl.getItems();

      // populiate items with items
      UICtrl.populateList(items);

      // load event listeners
      loadEventListeners();
    }          
  }

})(ItemCtrl,UICtrl);

AppCtrl.init();
