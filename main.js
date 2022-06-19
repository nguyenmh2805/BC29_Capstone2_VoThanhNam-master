var service = new Services();

var productList = [];

function getEle(id) {
    return document.getElementById(id);
}

function getListProducts(){
    var promise = service.getListProductApi();
    return promise
        .then(function (result){
            renderListProducts(result.data);
            productList = result.data;
        })
        .catch(function (error){
            console.log(error);
        });
}

    getListProducts();



async function onChangeProduct(obj){
    await getListProducts();
    var phoneType = obj.value;
    var resultPhoneType = [];

    if (phoneType === "all"){
        renderListProducts(productList);
    } else {
        for (var i = 0; i < productList.length; i++){
            if (productList[i].type === phoneType){
                resultPhoneType.push(productList[i]);
            }
        }
    
        renderListProducts(resultPhoneType);
    }
    
}


function renderListProducts(data){
    var contentHTML = "";

    data.forEach(function(product){
        contentHTML += `
        <div class="card">
                        <div class="top-bar">
                            <i class="fab fa-apple"></i>
                            <em class="stocks">In Stock</em>
                        </div>
                        <div class="img-container">
                            <img class="product-img" src="./image/${product.img}" alt="">
                        </div>
                        <div class="details">
                            <div class="name-fav">
                                <strong class="product-name">${product.name}</strong>
                                <button class="heart">
                                    <i class="fas fa-heart"></i>
                                </button>
                            </div>
                            <div class="wrapper">
                                <p>${product.desc}</p>
                            </div>
                            <div class="purchase">
                                <p class="product-price">${product.price}$</p>
                                <span class="btn-add">
                                    <div>
                                        <button onclick="addItem(this)" class="add-btn">Add <i
                                                class="fas fa-chevron-right"></i></button>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
        `
    });


    getEle("listProducts").innerHTML = contentHTML;
}