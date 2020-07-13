import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    adminProducts: [],
    productAdded: false,
    productEdited: false,
    adminRedirectPath: '/admin',
    loading: false,
    error: false,
}

const fetchAdminProductsStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const fetchAdminProductsSuccess = (state, action) => {
    return updateObject(state, {
        adminProducts: action.adminProducts,
        loading: false,
        error: false
    })
}

const fetchAdminProductsFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const adminAddProductInit = (state, action) => {
    return updateObject(state, {
        productAdded: false
    })
}

const adminAddProductStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const adminAddProductSuccess = (state, action) => {
    const newProduct = action.newProduct
    return updateObject(state, {
        loading: false,
        productAdded: true,
        adminProducts: state.adminProducts.concat(newProduct),
        adminRedirectPath: '/admin'
    })
}

const adminAddProductFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
        adminRedirectPath: '/admin/add-product'
    })
}

const adminDeleteProductStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const adminDeleteProductSuccess = (state, action) => {
    const updatedProducts = state.adminProducts.filter(p => p.id !== action.productId)
    return updateObject(state, {
        loading: false,
        adminProducts: updatedProducts,
        adminRedirectPath: '/admin'
    })
}

const adminDeleteProductFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
        adminRedirectPath: '/admin'
    })
}

const adminEditProductInit = (state, action) => {
    return updateObject(state, {
        productEdited: false
    })
}

const adminEditProductStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const adminEditProductSuccess = (state, action) => {
    const idx = state.adminProducts.findIndex(product => product.id === action.productId)
    const updatedProducts = [...state.adminProducts]
    updatedProducts[idx] = action.editedProduct
    return updateObject(state, {
        loading: false,
        productEdited: true,
        adminProducts: updatedProducts,
        adminRedirectPath: '/admin'
    })
}

const adminEditProductFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
        adminRedirectPath: '/admin'
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ADMIN_PRODUCTS_START:
            return fetchAdminProductsStart(state, action)
        case actionTypes.FETCH_ADMIN_PRODUCTS_SUCCESS:
            return fetchAdminProductsSuccess(state, action)
        case actionTypes.FETCH_ADMIN_PRODUCTS_FAIL:
            return fetchAdminProductsFail(state, action)
        case actionTypes.ADMIN_ADD_PRODUCT_INIT:
            return adminAddProductInit(state, action)
        case actionTypes.ADMIN_ADD_PRODUCT_START:
            return adminAddProductStart(state, action)
        case actionTypes.ADMIN_ADD_PRODUCT_SUCCESS:
            return adminAddProductSuccess(state, action)
        case actionTypes.ADMIN_ADD_PRODUCT_FAIL:
            return adminAddProductFail(state, action)
        case actionTypes.ADMIN_DELETE_PRODUCT_START:
            return adminDeleteProductStart(state, action)
        case actionTypes.ADMIN_DELETE_PRODUCT_SUCCESS:
            return adminDeleteProductSuccess(state, action)
        case actionTypes.ADMIN_DELETE_PRODUCT_FAIL:
            return adminDeleteProductFail(state, action)
        case actionTypes.ADMIN_EDIT_PRODUCT_INIT:
            return adminEditProductInit(state, action)
        case actionTypes.ADMIN_EDIT_PRODUCT_START:
            return adminEditProductStart(state, action)
        case actionTypes.ADMIN_EDIT_PRODUCT_SUCCESS:
            return adminEditProductSuccess(state, action)
        case actionTypes.ADMIN_EDIT_PRODUCT_FAIL:
            return adminEditProductFail(state, action)
        default:
            return state
    }
}

export default reducer