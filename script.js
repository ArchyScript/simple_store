 
var PRODUCT_CONTAINER = document.getElementById('product_container')
var USER_OUTPUT_TABLE = document.getElementById('user_output_table')
var CONTINUE_PURCHASE = document.getElementById('continue_purchase')
var TOTAL_PRICE = document.getElementById('total_price')
var TABLE_BODY = document.getElementById('table_body')
var CLEAR_ALL = document.getElementById('clear_all')

// Create Re-useable Functions
function displayInnerHTML (contentId, displayValue) {
  document.getElementById(contentId).innerHTML = displayValue
}
function displayContent (contentId, displayValue) {
  document.getElementById(contentId).style.display = displayValue
}
function contentOpacity (contentId, opacityValue) {
  document.getElementById(contentId).style.opacity = opacityValue
}

function amountBounghtPerItem () {
  var itemPrices = document.querySelectorAll('.item_price')
  var numOfItems = document.querySelectorAll('.number_of_item')
  var totalPricePerItems = document.querySelectorAll('.total_price_per_item')
  
  for (let i = 0; i < numOfItems.length; i++) {
    let itemPrice = itemPrices[i]
    let numOfItem = numOfItems[i]
    let totalPricePerItem = totalPricePerItems[i]
    
    let x = numOfItem.value * itemPrice.value
    totalPricePerItem.value = x

    numOfItem.addEventListener('input', () => {
      if (numOfItem.value <= 0) {
        alert("You can't purchase item less than one item")
        return numOfItem.value = 1
      }
      let x = numOfItem.value * itemPrice.value
      totalPricePerItem.value = x 
      userTotalPrice()
    })
  }
  function userTotalPrice () {
    total = 0
    totalPricePerItems.forEach(event => {
      let x = parseInt(event.value)
      total += x
    })
    TOTAL_PRICE.value = `$ ${total}.00`
  }
  userTotalPrice()
}
amountBounghtPerItem() 



function checkStatus () {
  let itemStatus = PRODUCT_CONTAINER.querySelectorAll('.item_status')
  let remainingItems = PRODUCT_CONTAINER.querySelectorAll('.remaining_item')
  let changeStatuss = PRODUCT_CONTAINER.querySelectorAll('.change_status')
// Check Status Function
for (let i = 0; i < itemStatus.length; i++) {
 
  let  status = itemStatus[i]
  let remainingItem = remainingItems[i]
  let changeStatus = changeStatuss[i]

    if (remainingItem.value == 0) {
      status.classList.add('not_available')
      changeStatus.innerHTML = 'NOT AVAILABLE'
      status.innerHTML = 'NOT AVAILABLE'
    } else {
      status.classList.add('available')
      changeStatus.innerHTML = 'AVAILABLE'
      status.innerHTML = 'AVAILABLE'
    }
  }
}
checkStatus()
                                                        
// Funtion to delete all selected item
var delItems = PRODUCT_CONTAINER.querySelectorAll('.del_item')
for (let i = 0; i < delItems.length; i++) {
let delItem = delItems[i] 
delItem.addEventListener('click', (e) => {
  USER_OUTPUT_TABLE.removeChild(e.target.parentElement)
  amountBounghtPerItem()
})
}

// add function to the 'add item' btn
function addItemBtnOnClick () {  

  let itemStatus = PRODUCT_CONTAINER.querySelectorAll('.item_status')
  let remainingItems = PRODUCT_CONTAINER.querySelectorAll('.remaining_item')
  let addItemBtns = PRODUCT_CONTAINER.querySelectorAll('.add_btn')
  let nameOfItems = PRODUCT_CONTAINER.querySelectorAll('H3')
  let priceOfItems = PRODUCT_CONTAINER.querySelectorAll('.price_of_item')

for (let i = 0; i < addItemBtns.length; i++) {
  // Add this to stop repeating [i]
  let addItemBtn = addItemBtns[i]
  let status = itemStatus[i]
  let nameOfItem = nameOfItems[i]
  let remainingItem = remainingItems[i]
  let priceOfItem = priceOfItems[i]

  addItemBtn.addEventListener('click', () => {
    
    if (status.innerHTML == 'NOT AVAILABLE') return alert('Item is not available')
      
    if (status.innerHTML == 'AVAILABLE') {  
      var itemNames = document.querySelectorAll('.item_name')

      for (let i = 0; i < itemNames.length; i++) {
        let itemName = itemNames[i]

        if (itemName.innerText == nameOfItem.innerText) { 
          return alert('Item Has Been Added To Cart, You can increase the amount you want') 
        } 
      } 
      remainingItem.value--
      checkStatus() 

      USER_OUTPUT_TABLE.innerHTML +=
        ` <li> 
          <span class="item_name">${nameOfItem.innerText}</span>
          <input type="number" class="item_price" value="${priceOfItem.value}" readonly>
          <input type="number" class="number_of_item" value="1" >
          <input type="number" class="total_price_per_item" readonly>
          <span class="del_item" title="Remove Item From Cart">&times;</span>
        </li> `
         
        displayContent('user_output', 'block') 
        amountBounghtPerItem() 


        // Delete Item after it is added to the cart
        var delItems = document.querySelectorAll('.del_item')
        for (let i = 0; i < delItems.length; i++) {
          let delItem = delItems[i] 

          delItem.addEventListener('click', (e) => {
            USER_OUTPUT_TABLE.removeChild(e.target.parentElement)
            amountBounghtPerItem()
            if (TOTAL_PRICE.value == '$ 0.00') {
              displayContent('user_output', 'none')
            }
          })
        }
      }
    })
  }
}
  addItemBtnOnClick()

var CANCEL_PURCHASE = document.getElementById('cancel_purchase')
var CONFIRM_PURCHASE = document.getElementById('confirm_purchase')
   
CONTINUE_PURCHASE.onclick = () => {
  displayAllFields('none')
  displayContent('purchase_stat', 'block')
  contentOpacity('product_container', .1)
  finalPurchase()
} 
function finalPurchase() {
  var itemNames = document.querySelectorAll('.item_name')
  var itemPrices = document.querySelectorAll('.item_price')
  var numOfItems = document.querySelectorAll('.number_of_item')
  var totalPricePerItems = document.querySelectorAll('.total_price_per_item')

  let itemLength = itemNames.length


  for (let i = 0; i < itemLength; i++) {
    let itemName = itemNames[i]
    let itemPrice = itemPrices[i]
    let numOfItem = numOfItems[i]
    let totalPricePerItem = totalPricePerItems[i]

    TABLE_BODY.innerHTML += 
      ` <tr>
          <td>${itemName.innerText}</td>
          <td>$ ${itemPrice.value}.00</td>
          <td>${numOfItem.value}</td>
          <td>${totalPricePerItem.value}.00</td>
        </tr> `
  }
} 

CANCEL_PURCHASE.onclick = () => {
  contentOpacity('product_container', 1)
  displayContent('purchase_stat', 'none')
  displayContent('user_output', 'block')
  // Set the final purchase stat. twble body to EMPTY to avoid repetetion
  TABLE_BODY.innerHTML = ""
}
CONFIRM_PURCHASE.onclick = () => {
  
  let check = confirm(`
    Sum Total Price of item Item Bouhgt is ==>> ${TOTAL_PRICE.value}.00

    ..............................................

    Click "OK" to Confirm Purchase OR 
    "CANCEL" to Check Purchase Stat
  `)
  if (check) {
    alert(`
      Thanks for Patronizing Us... We LOVE you... You can share your experience with us using the comment section below 
      THANK YOU
    `)
    location.reload()
  } else {
    return
  }
}



// Allows user to search for note by Title
const searchItem = () => {
  var searchItemInput, searchResultName, filter, searchHeader, txtValue

  searchItemInput = document.getElementById('search_item')
  filter = searchItemInput.value.toUpperCase()
  searchSection = PRODUCT_CONTAINER.querySelectorAll('.row')
  searchHeader = PRODUCT_CONTAINER.querySelectorAll('.item_head')

  for (let i = 0; i < searchHeader.length; i++) { 
    searchResultName = searchHeader[i].getElementsByTagName('H3')[0]
    txtValue = searchResultName.innerHTML
    
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      searchSection[i].style.display = ''
      searchResultName.style.color = 'lightgreen'
      displayInnerHTML("search_err_msg", '') 

    } else {
      searchSection[i].style.display = 'none'
      displayInnerHTML('search_err_msg', '***Item not found, Check spelling')
    }

    if (searchItemInput.value == '') {
      searchResultName.style.color = 'inherit'
      displayInnerHTML("search_err_msg", '')
    }
  }
} 






  // Account creation and login section
  var ADD_NEW_PRDOUCT = document.getElementById('add_new_product')
  var LOGIN_USER_NAME = document.getElementById('login_user_name')
  var LOGIN_USER_PASSWORD = document.getElementById('login_user_password')
  var LOGIN_BTN = document.getElementById('login_btn')
  var SIGN_UP_BTN = document.getElementById('sign_up_btn')
  var PRODUCERS_LOGIN = document.getElementById('producer_login')
  
  // Re-useable function to ===>>>
  // Display login and signup form with any display style
  function  loginAndSignUpDisplay (style1, style2) {
    displayContent('login_form', style1)
    displayContent('sign_up_form', style2)
  }
  // Clear all error messages while typing
  function clearErrorMessages(eventId, tagName, errMessageId) {

    let IdVariableName = document.getElementById(eventId)
    let allEvents = IdVariableName.getElementsByTagName(tagName)

    for (let i = 0; i < allEvents.length; i++) {
      eachEvent = allEvents[i];
      eachEvent.oninput = () => {
        displayInnerHTML(errMessageId, '')
      }
    }
  }
  // Call the the functions and add the necessary value
  // Clear all Error Messages for Login and Sign in form while typing
  clearErrorMessages ("login_form", "input", "login_err_msg")
  clearErrorMessages ("sign_up_form", "input", "sign_up_err_msg")
  // Clear Error messages for New Product form while typing
  clearErrorMessages ("new_product_id", "input", "new_product_err_msg")
  clearErrorMessages ("new_product_id", "textarea", "new_product_err_msg")
  clearErrorMessages ("new_producer_id", "input", "new_producer_err_msg")
  clearErrorMessages ("new_producer_id", "textarea", "new_producer_err_msg")
  // Clear Error messages for the Admin Form while typing 
  clearErrorMessages ('admin_login_form', 'input', 'admin_err_msg')



  // Add funtion to the ADD PRODUCT btn
  ADD_NEW_PRDOUCT.addEventListener('click', () => {

    let confirmUser = confirm('Are You a Registered Producer')
    if (confirmUser) {
      displayAllFields('none')
      loginAndSignUpDisplay ('flex', 'none')
    } 

    if(!confirmUser) {
      let newUser = confirm('Do you want to create a Producer Account?') 
      if (newUser) {
        displayAllFields('none')
        loginAndSignUpDisplay ('none', 'flex')
        displayInnerHTML('sign_up_err_msg', '')
      } else {
        return loginAndSignUpDisplay ('none', 'none')
      }
    }
    displayInnerHTML('login_err_msg', '')
    displayInnerHTML('sign_up_err_msg', '')
    clearInputValues("")
  })

  // Get all SignUp input value
  var SIGN_UP_USERNAME = document.getElementById('sign_up_user_name')
  var SIGN_UP_USER_PASSWORD = document.getElementById('sign_up_user_password')
  var SIGN_UP_USER_NUMBER = document.getElementById('sign_up_user_number')
  var SIGN_UP_USER_EMAIL = document.getElementById('sign_up_user_email')
  var SIGN_UP_USER_CONFIRM_PASSWORD = document.getElementById('sign_up_user_confirm_password')
   
  const clearInputValues = (empty) => {
    // Set all Login Input value  to the value passed in this function and in this case is (empty) or ("")
    LOGIN_USER_NAME.value = empty
    LOGIN_USER_PASSWORD.value = empty
    // Set all SignUp Input value  to the value passed in this function and in this case is (empty) or ("")
    SIGN_UP_USERNAME.value = empty
    SIGN_UP_USER_PASSWORD.value = empty
    SIGN_UP_USER_CONFIRM_PASSWORD.value = empty
    SIGN_UP_USER_NUMBER.value = empty
    SIGN_UP_USER_EMAIL.value = empty

    // New Product Input Value
    newProductName.value = empty
    newProductDescription.value = empty
    newProductProductionDate.value = empty
    newProductExpiryDate.value = empty
    newProductPrice.value = empty
    newProductTotalAvailable.value = empty
    // New Producer Input value
    newProducerName.value = empty
    newProducerPhoneNumber.value = empty
    newProducerEmail.value = empty
    newProducerAddress.value = empty
    newProducerWebsiteAddress.value = empty
    newProducerWebsiteTitle.value = empty

    // // Admin Login Form Input value
    adminUsernameInput.value = empty
    adminPasswordInput.value = empty
  }

  // Add functions to the login link and signUp link
  //  Display Login and SignUp page,set all input value and all related error message to (empty) or ("") 
  document.getElementById('sign_up_link').onclick = signUp 
  document.getElementById('login_link').onclick = login 
  function signUp () {
    displayAllFields('none')
    displayContent('sign_up_form','flex')
    displayInnerHTML('login_err_msg', '')
    clearInputValues("")
  }
  function login () {
    displayAllFields('none')
    displayContent('login_form','flex')
    displayInnerHTML('sign_up_err_msg', '')
    clearInputValues("")
  }

  // All Sign Up Arays
  PRODUCERS_CREDENTIALS = [] 
  var allCredentials = document.getElementById('all_producer_accn_credentials')
  function createNewProducerAccount () { 
    // Check if any of the signup input value is empty and return if it is false
    if (!SIGN_UP_USERNAME.value || !SIGN_UP_USER_PASSWORD.value || !SIGN_UP_USER_NUMBER.value || !SIGN_UP_USER_EMAIL.value) return

    newProducerCredentials = {
      newProducerUsername: SIGN_UP_USERNAME.value,
      newProducerPassword: SIGN_UP_USER_PASSWORD.value,
      newProducerNumber: SIGN_UP_USER_NUMBER.value,
      newProducerEmail: SIGN_UP_USER_EMAIL.value
    } 

    // check if the "PRODUCERS_CREDENTIALS" key is empty and push the object inside the PRODUCERS_CREDENTIALS array
    if (localStorage.getItem("PRODUCERS_CREDENTIALS") === null) {
      let PRODUCERS_CREDENTIALS = [] // This is added here in case if the ADMIN deletes all products from the store
      PRODUCERS_CREDENTIALS.push(newProducerCredentials)
      // convert the PRODUCERS_CREDENTIALS array to a JSON string and assign it as a value to the "PRODUCERS_CREDENTIALS" key
      localStorage.setItem("PRODUCERS_CREDENTIALS", JSON.stringify(PRODUCERS_CREDENTIALS))
    } else { 
      // checks if localStorage is not empty and convert it to a javaScript object
      PRODUCERS_CREDENTIALS = JSON.parse(localStorage.getItem("PRODUCERS_CREDENTIALS"))
      // then push a newly created note to the PRODUCERS_CREDENTIALS array
      PRODUCERS_CREDENTIALS.push(newProducerCredentials)
      // and convert the PRODUCERS_CREDENTIALS array back to a JSON string and assign it as a value to the "PRODUCERS_CREDENTIALS" key
      localStorage.setItem("PRODUCERS_CREDENTIALS", JSON.stringify(PRODUCERS_CREDENTIALS))
    } 
  }
  
  function displayAllCredentials() {
    PRODUCERS_CREDENTIALS = JSON.parse(localStorage.getItem("PRODUCERS_CREDENTIALS"))

    for (let i = 0; i < PRODUCERS_CREDENTIALS.length; i++) {

      let producerUsername =  PRODUCERS_CREDENTIALS[i].newProducerUsername;
      let producerPassword =  PRODUCERS_CREDENTIALS[i].newProducerPassword;
      let producerNumber =  PRODUCERS_CREDENTIALS[i].newProducerNumber;
      let producerEmail =  PRODUCERS_CREDENTIALS[i].newProducerEmail;
       
      allCredentials.innerHTML += 
          ` <div class="each">
              <div class="credential_row">
                <label>Username :</label>
                <input type="text" value="${producerUsername}" readonly disabled>
              </div>
              <div class="credential_row">
                <label>Password :</label>
                <input type="text" value="${producerPassword}" readonly disabled>
              </div>
              <div class="credential_row">
                <label>Number :</label>
                <input type="number" value="${producerNumber}" readonly disabled>
              </div>
              <div class="credential_row">
                <label>Email :</label>
                <input type="email" value="${producerEmail}" readonly disabled>
              </div> 
            </div>`
    } 
  }
  // Login btn onclick
  LOGIN_BTN.onclick = (event) => { 
  
    event.preventDefault()

    // Call this function to get all Producer Account Credentials from the localstorage
    if (localStorage.getItem("PRODUCERS_CREDENTIALS") !== null) {
      displayAllCredentials()
    } else {
      return displayInnerHTML('login_err_msg', 'No account has been created, Click the Sign Up link to create one')
    }

    // Check all Login Field is empty
    if (!LOGIN_USER_NAME.value || !LOGIN_USER_PASSWORD.value) {
      return displayInnerHTML('login_err_msg', 'Username or Password field is EMPTY... Check it and try again')
    }

    // Loop through all the Producers Credentials and Login if the account Exist
    for (let i = 0; i < PRODUCERS_CREDENTIALS.length; i++) {
      let eachUsername = PRODUCERS_CREDENTIALS[i].newProducerUsername
      let eachUserPassword = PRODUCERS_CREDENTIALS[i].newProducerPassword

      let usernameAndPassword = LOGIN_USER_NAME.value === eachUsername && LOGIN_USER_PASSWORD.value === eachUserPassword

      if (usernameAndPassword) {
        displayAllFields('none')
        displayContent('new_product_form', 'block')
        displayInnerHTML('login_err_msg', '')
        clearInputValues("")
      } else {
        displayInnerHTML('login_err_msg', 'Username or Password is not correct... Check and try again <br> OR <br> Create a New Producer Account')
      } 
    }
  }

  // // Sign Up Page
  SIGN_UP_BTN.onclick = (event) => { 

    event.preventDefault()

    if (localStorage.getItem("PRODUCERS_CREDENTIALS") !== null) {
      displayAllCredentials()
    }
  
    // // Form Validation
    if (!SIGN_UP_USERNAME.value || !SIGN_UP_USER_PASSWORD.value || !SIGN_UP_USER_NUMBER.value || !SIGN_UP_USER_EMAIL.value) {
      return displayInnerHTML('sign_up_err_msg', 'Check if one of the field is empty')
    } 
    // Check if Username already exist
    for (let i = 0; i < PRODUCERS_CREDENTIALS.length; i++) {
      let eachUsername = PRODUCERS_CREDENTIALS[i].newProducerUsername
      let eachUserEmail = PRODUCERS_CREDENTIALS[i].newProducerEmail

      if (SIGN_UP_USERNAME.value === eachUsername) return displayInnerHTML('sign_up_err_msg', 'Account name already exist')
      if (SIGN_UP_USER_EMAIL.value === eachUserEmail) return displayInnerHTML('sign_up_err_msg', 'Email has been used exist')
        
    }
    // Validate Username
    if (SIGN_UP_USERNAME.value.length <= 4 || SIGN_UP_USERNAME.value.length >= 20 ) {
      return displayInnerHTML('sign_up_err_msg', 'Username is less than 4 OR greater than 20 character')
    }   
    // validate User Password
    if (SIGN_UP_USERNAME.value === SIGN_UP_USER_PASSWORD.value) {
      return displayInnerHTML('sign_up_err_msg', "Password  is the same as the username and it's not secure")
    }  
    // validate User Password
    if (SIGN_UP_USER_PASSWORD.value.length <= 4 || SIGN_UP_USER_PASSWORD.value.length >= 20) {
      return displayInnerHTML('sign_up_err_msg', 'Password is less than 4 OR greater than 20 character')
    }  
    // validate User Confirm Password
    if (SIGN_UP_USER_CONFIRM_PASSWORD.value !== SIGN_UP_USER_PASSWORD.value) {
      return displayInnerHTML("sign_up_err_msg", "Passwords Not Matching")
    } 
    // validate User Phone Number  
    if (SIGN_UP_USER_NUMBER.value.length < 10 || SIGN_UP_USER_NUMBER.value.length > 11) {
      return displayInnerHTML("new_producer_err_msg", "Phone Number is Less than Ten(10) or greater than Eleven(11) characters")
    }
    // Validate User Email Address
    // Validate User Email Address
    if (!SIGN_UP_USER_EMAIL.value.includes('@')) {
      return displayInnerHTML("sign_up_err_msg", "Email should include ('@')")
    } 
    if (!SIGN_UP_USER_EMAIL.value.includes('.')) {
      return displayInnerHTML("sign_up_err_msg", "Email  is not Valid, there is a dot('.') missing")
    } 
    if (SIGN_UP_USER_EMAIL.value.length < 8) {
      return displayInnerHTML('sign_up_err_msg', "Email Address is can't be less than Eight(8) characters")
    }



    alert("Account sucessfully created")
    createNewProducerAccount()
    let check = confirm("Do you want to continue with adding new product to our store")
    if (check) {
      displayAllFields('none')
      displayContent('login_form', 'flex')
    } else {
      displayAllFields('none')
    }
    
    // Clear all error messages and set all Login and SignUp input value (empty) or ("")
    displayInnerHTML('sign_up_err_msg', '')
    clearInputValues("")
  }





  


  // New Product Info Inputs
  var newProductName = document.getElementById('new_product_name')
  var newProductDescription = document.getElementById('new_product_description')
  var newProductProductionDate = document.getElementById('new_product_production_date')
  var newProductExpiryDate = document.getElementById('new_product_expiry_date')
  var newProductPrice = document.getElementById('new_product_price')
  var newProductTotalAvailable = document.getElementById('new_product_total_available')
  // New Producer info Inputs
  var newProducerName = document.getElementById('new_producer_name')
  var newProducerPhoneNumber = document.getElementById('new_producer_phone_number')
  var newProducerEmail = document.getElementById('new_producer_email')
  var newProducerAddress = document.getElementById('new_producer_address')
  var newProducerWebsiteAddress = document.getElementById('new_producer_website_address')
  var newProducerWebsiteTitle = document.getElementById('new_producer_website_title')

  // Create an array to store all product section in a localstorage
  var newProducts = []

   // create a function to create a newProduct
   function createNewProduct () {
    // create an object that takes on the newly created product and producer information
    var newProduct = {
      productName: newProductName.value,
      productDescription: newProductDescription.value,
      productProductionDate: newProductProductionDate.value,
      productExpiryDate: newProductExpiryDate.value,
      productPrice: newProductPrice.value,
      productTotalAvailable: newProductTotalAvailable.value,

      producerName: newProducerName.value,
      producerPhoneNumber: newProducerPhoneNumber.value,
      producerEmail: newProducerEmail.value,
      producerAddress: newProducerAddress.value,
      producerWebsiteAddress: newProducerWebsiteAddress.value,
      producerWebsiteTitle: newProducerWebsiteTitle.value
    } 
    // check if the "newProducts" key is empty and push the object inside the newProducts array
    if (localStorage.getItem("newProducts") === null) {
      newProducts = [] // This is added here in case if the ADMIN deletes all products from the store
      newProducts.push(newProduct)
      // convert the newProducts array to a JSON string and assign it as a value to the "newProducts" key
      localStorage.setItem("newProducts", JSON.stringify(newProducts))
     } else { 
      // checks if localStorage is not empty and convert it to a javaScript object
      newProducts = JSON.parse(localStorage.getItem("newProducts"))
      // then push a newly created note to the newProducts array
      newProducts.push(newProduct)
      // and convert the newProducts array back to a JSON string and assign it as a value to the "newProducts" key
      localStorage.setItem("newProducts", JSON.stringify(newProducts))
    } 
  }


  function displayAllProducts () {
    newProducts = JSON.parse(localStorage.getItem("newProducts"))
    
    // Remove all Created Product from the DOM if any
    PRODUCT_CONTAINER.innerHTML = ""

    for (let i = 0; i < newProducts.length; i++) {
      
      let newProductName =  newProducts[i].productName;
      let newProductDescription =  newProducts[i].productDescription;
      let newProductProductionDate =  newProducts[i].productProductionDate;
      let newProductExpiryDate =  newProducts[i].productExpiryDate;
      let newProductPrice =  newProducts[i].productPrice;
      let newProductTotalAvailable =  newProducts[i].productTotalAvailable;

      let newProducerName =  newProducts[i].producerName;
      let newProducerPhoneNumber =  newProducts[i].producerPhoneNumber;
      let newProducerEmail =  newProducts[i].producerEmail;
      let newProducerAddress =  newProducts[i].producerAddress
      let newProducerWebsiteAddress =  newProducts[i].producerWebsiteAddress;
      let newProducerWebsiteTitle =  newProducts[i].producerWebsiteTitle
      
    PRODUCT_CONTAINER.innerHTML += 
      ` <section class="row">
          <div class="item_container">
            <div class="item_head">
              <h3>${newProductName}</h3>
              <span class="item_status">AVAILABLE</span>
            </div> 
            <div class="item_body">
              <fieldset> 
                <legend>Product Information</legend>
                <div class="product_info"><strong>Name:</strong> <span>${newProductName}</span></div>
                <div class="product_info"><strong>Description:</strong> <span>${newProductDescription}</span></div>
                <div class="product_info"><strong>Production Date:</strong> <span>${newProductProductionDate}</span></div>
                <div class="product_info"><strong>Expiry Date:</strong> <span>${newProductExpiryDate}</span></div>
                <div class="product_info"><strong>Status:</strong> <span class="change_status">AVAILABLE</span></div>
                <div class="product_info"><strong>Price:</strong> <input type="number" class="price_of_item" value="${newProductPrice}" readonly disabled></div>
                <div class="product_info"><strong>Remains:</strong> <input type="number" class="remaining_item" value="${newProductTotalAvailable}"readonly disabled></div>
                <div class="product_info"><strong>Reviews:</strong><span>&star; &star; &star; &star; </span> </div>
              </fieldset> 
              <fieldset> 
                <legend>Producer Information</legend>
                <div class="producer_info"><strong>Name:</strong> <span>${newProducerName}</span></div>
                <div class="producer_info"><strong>Email:</strong> <span>${newProducerEmail}</span></div>
                <div class="producer_info"><strong>Address:</strong> <span>${newProducerAddress}</span></div>
                <div class="producer_info"><strong>Phone Number:</strong> <span><a href="tel: +234${newProducerPhoneNumber}">Call Us Now</a></span> </div>
                <div class="producer_info"><strong>Website:</strong> <span><a href="http://${newProducerWebsiteAddress}" target="_blank">@${newProducerWebsiteTitle}</a> </span> </div>
                </fieldset> 
            </div> 
          </div>
          <div class="item_operation"> 
            <span class="add_btn">Add Item</span>
            <span class="call_btn"><a href="tel: +234${newProducerPhoneNumber}" title="Call Us Now">Call Us</a></span>
          </div>
        </section> `
    
        checkStatus()
        addItemBtnOnClick()
        amountBounghtPerItem()
    }
  }

 
  // Submit new product form and add new product to the store
  const SUBMIT_NEW_PRODUCT_BTN = document.getElementById('submit_new_product_btn')
    SUBMIT_NEW_PRODUCT_BTN.onclick = (event) => {
      
    event.preventDefault()

    // Set all error messages to an empty string on return
    displayInnerHTML('new_product_err_msg', '')
    displayInnerHTML('new_product_err_msg', '')

    // New Product and Producer Form validation
    // Check if all fields are Empty
    if (!newProductName.value || !newProductDescription.value || !newProductPrice.value || !newProductTotalAvailable.value) {
      return displayInnerHTML('new_product_err_msg', 'Check if any of the Product Info. Section is Empty')
    }
    if (!newProducerName.value || !newProducerPhoneNumber.value || !newProducerEmail.value || !newProducerAddress.value || !newProducerWebsiteAddress.value || !newProducerWebsiteTitle.value) {
      return displayInnerHTML('new_producer_err_msg', 'Check if any of the Producer Info. Section is Empty')
    }
    // Product Field Validation
    // validate New Product Name
      if (newProductName.value.length <= 4 || newProductName.value.length >= 20) {
      return displayInnerHTML('new_product_err_msg', 'Product Name is less than Four(4) OR greater than Twenty(20) characters')
    }  
    // validate New Product Description
    if (newProductDescription.value.length < 30 || newProductDescription.value.length > 100) {
      return displayInnerHTML('new_product_err_msg', 'Product Description is less than Thirty(30) OR greater than a hundred(10) characters')
    }
    // Date Validation
    if (!newProductProductionDate.value || !newProductExpiryDate.value) {
      return displayInnerHTML('new_product_err_msg', 'Date Format Is Wrong')
    }
    if (newProductProductionDate.value > newProductExpiryDate.value) {
      return displayInnerHTML("new_product_err_msg", "Item cannot expire before Production Date")
    } 
    // validate New Product Price
    if (newProductPrice.value < 10) {
      return displayInnerHTML("new_product_err_msg", "The Product Price Can't be less than Ten(10)")
    }
    // validate New Product Amount of Item Available
      if (newProductTotalAvailable.value < 1 || newProductTotalAvailable.value > 10000) {
      displayInnerHTML("new_product_err_msg", "Total number of Product should be More than One(1) and Less than Ten thousand(10,000)")
    }
  
    // Producer Field Validation
    // validate Producer Name
    if (newProducerName.value.length < 8 || newProducerName.value.length > 30) {
      return displayInnerHTML("new_producer_err_msg", "Producer Name is Less than Eight(8) or greater than Thirty(30) characters")
    } 
    // validate Producer Phone Number
    if (newProducerPhoneNumber.value.length < 10 || newProducerPhoneNumber.value.length > 11) {
      return displayInnerHTML("new_producer_err_msg", "Producer Phone Number is Less than Ten(10) or greater than Eleven(11) characters")
    }
    // validate Producer Address
    if (newProducerAddress.value.length < 20 || newProducerAddress.value.length > 70) {
      return displayInnerHTML('new_producer_err_msg', 'Producer Address might not be valid...')
    }
    // validate producer email and website address
    if (newProducerEmail.value.length < 8 || newProducerEmail.value.length > 30) {
      return displayInnerHTML("new_producer_err_msg", "Producer Email is Less than Eight(8) or greater than Thirty(30) characters")
    }
    if (newProducerWebsiteAddress.value.length < 8 || newProducerWebsiteAddress.value.length > 20) {
      return displayInnerHTML("new_producer_err_msg", "Producer Website tile is Less than Eight(8) or greater than Twenty(20) characters")
    } 
    if (!newProducerEmail.value.includes('@')) {
      return displayInnerHTML("new_producer_err_msg", "Email should include ('@')")
    } 
    if (!newProducerEmail.value.includes('.') || !newProducerWebsiteAddress.value.includes('.')) {
      return displayInnerHTML("new_producer_err_msg", "Email or Website Address should include a dot('.')")
    }  
    
    // Confirm if the user should continue with the addition of new item
    let confirmNewProduct = confirm("Are you sure you want to add this product to our STORE")
    if (confirmNewProduct) {
      displayAllFields('none')
      checkStatus()
      addItemBtnOnClick()
      amountBounghtPerItem()
      createNewProduct()
      displayAllProducts()
      clearInputValues("")

    } else {
      return
    }
  }
 





  // Admin Login Button
  const ADMIM_LOGIN = document.getElementById('admin_login') 
  ADMIM_LOGIN.addEventListener('click', () => {
    let check = confirm(`
      Are you an  admin of this website?,
      Click "OK" to Login to your Admin Account OR
      "CANCEL" to return
    `)
    if (check) {
      displayAllFields('none')
      displayContent('admin_login_form', 'flex')
    } else {
      return
    }
  }) 
  // Home Page Button
  const HOME_PAGE = document.getElementById('home_page') 
  HOME_PAGE.addEventListener('click', () => {
    location.reload()
  }) 


  var adminUsernameInput = document.getElementById('admin_user_name')
  var adminPasswordInput = document.getElementById('admin_password')

  // Admin Login Form Button
  const ADMIM_LOGIN_BTN = document.getElementById('admin_login_btn')
  ADMIM_LOGIN_BTN.addEventListener('click', () => {

    const ADMIN_LOGIN_CREDENTIAL = {
      adminUsername: "ArchyScript",
      adminPassword: "ArchyScript@10" 
    } 
    if (!adminUsernameInput.value || !adminPasswordInput.value) {
      return displayInnerHTML('admin_err_msg', 'Username or Password field is empty')
    }
    if (adminUsernameInput.value !== ADMIN_LOGIN_CREDENTIAL.adminUsername) {
      return displayInnerHTML('admin_err_msg', 'This Username is not Correct')
    } 
    if (adminPasswordInput.value !== ADMIN_LOGIN_CREDENTIAL.adminPassword) {
      return displayInnerHTML('admin_err_msg', 'This Password is not Correct')
    } 

    displayAllFields('none')
    clearInputValues("")
    displayContent('search_and_add', 'none')
    displayContent('product_container', 'none')
    displayContent('all_producer_accn_credentials', 'block')
    displayContent('admin_login', 'none')
    displayContent('home_page', 'block')
      displayInnerHTML('header_text', "WEBSITE'S ADMIN ACOOUNT")

    if (localStorage.getItem("PRODUCERS_CREDENTIALS") !== null) {
      // Get and display all credentials frrom the localstorage
      displayAllCredentials()
    } else {
      return displayInnerHTML('all_producer_heading', 'No account has been created')
    }
  })
  
  // Clear Localstorage
  const CLEAR_LOCALSTORAGE = document.getElementById('clear_localstorage')
  CLEAR_LOCALSTORAGE.addEventListener("click", () => {

    if (localStorage.getItem("newProducts") === null && localStorage.getItem("PRODUCERS_CREDENTIALS") === null) return alert("There is nothing to clear, Localstorage is empty")

    let check = confirm("Are you sure you want to clear localstorage")
    if (check) {
       localStorage.clear()
       alert("Localstorage is cleared")
    } else {
      return
    }
  })

  // Create a function to remove all fields
  function displayAllFields (none) {
    loginAndSignUpDisplay(none, none)
    displayContent('user_output', none)
    displayContent('purchase_stat', none)
    displayContent('new_product_form', none)
    displayContent('home_page', none)
    displayContent('admin_login_form', none)
    displayContent('all_producer_accn_credentials', none)
  }
   displayAllFields('none')

  
  document.querySelector('body').onload = () => {
    if (localStorage.getItem("newProducts") === null) {

      displayInnerHTML('product_container', `
          <div class="default_page">
          <h3>There is no available Product</h3>
          <div>
            <ul>
              <li><a onclick="login()">Login</a> if you have a Producer Account OR <a onclick="signUp()">Sign Up</a> if you don't</li>
              <li>Add a new Product to Our Store</li>
            </ul>
          </div>
        </div>
    `)
    } else {
      // Display all products from the localstorage onload if it not empty
      displayAllProducts()
    }
  }

  