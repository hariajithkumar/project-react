import { configureStore } from "@reduxjs/toolkit";
import total_product from "../component/product_list/state/total_product";
import product_view  from "../component/product_id_details/state/product_view";
import  search_product  from "../component/product_list/state/search_product";
import select_item from "../component/product_list/state/select_item";
import select_product from "../component/product_list/state/select_product";
import user_login from "../component/login/state/user_login";
import todo from "../component/todo/state/todo";

export const store = configureStore ({
    reducer:{
        login_success :user_login,
        product_details : total_product,
        product_id_details : product_view,
        search_list_view : search_product,
        numbers_items : select_item,
        click_product : select_product,
        todoDetails : todo
    }
})