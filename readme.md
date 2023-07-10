API documentation:-

outputvideo : https://drive.google.com/file/d/1uozpiGKzmIhucmlzIBP_Bs7rLWzFual6/view?usp=sharing

Routes:-
    /api/register: 
        User will be able to create a new account

    /api/login
        User will be able to login to their respective accounts

    /api/login
        User will be able to reset their account password

    /api/restaurants
        This endpoint will return a list of all available restaurants.

    /api/restaurants/:id
        This endpoint will return the details of a specific restaurant identified by its ID.

    /api/restaurants/:id/menu
        This endpoint will return the menu of a specific restaurant identified by its ID.

    /api/restaurants/:id/menu
        This endpoint will allow the user to add a new item to a specific restaurants menu identified by it id

    /api/restaurants/:id/menu/:id2
        This endpoint will allow the user to delete a particular menu item identified by its id from a specific restaurant
        paramaters: 
            id: id of the restaurant
            id2: id of the item in the menus

    /api/orders
        This endpoint will allow the user to place an order.
        queries: 
            resId: restaurant _id
            itemId: menu item _id
            quantity: quantity of the order

    /api/orders/:id
        This endpoint will return the details of a specific order identified by its ID. (Populate all the details)
        
    /api/orders/:id
        This endpoint will allow users to update the status of a specific order identified by its ID
        queries: newStatus
