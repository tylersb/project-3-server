const db = require('./models')

const restaurantCRUD = async () => {
    try {
        //upsert a restaurant
        const newRestaurant = await db.Restaurant.findOneAndUpdate(
            {name: 'Pizza Galore'},
            {address: '123 Food Street',
            phone: 9876543210},
            {upsert: true, new: true}
        )

        // const newMenu = {
        //     sectionName: 'Pizza'
        // }
        // newRestaurant.menu.push(newMenu)

        const newProduct = {
            name:'Pepperoni',
            price: 15,
            description: 'mozzarella, pepperoni and marinara sauce on a pan pizza'
        }
        // newRestaurant.menu[0].products.push(newProduct)
        console.log('new restaurant', newRestaurant.menu[0].products[0])
        // newRestaurant.save()

    } catch (err) {
        console.log(err)
    }
}

restaurantCRUD()