// Admin
const Admin = resolve => {
  require.ensure(['@/views/Admin/index.vue'], () => {
    resolve(require('@/views/Admin/index.vue'));
  });
};
// Products
const Products = resolve => {
  require.ensure(['@/views/Admin/products/index.vue'], () => {
    resolve(require('@/views/Admin/products/index.vue'));
  });
};
// Category
const Category = resolve => {
  require.ensure(['@/views/Admin/category/index.vue'], () => {
    resolve(require('@/views/Admin/category/index.vue'));
  });
};
// Home
const Home = resolve => {
  require.ensure(['@/views/Admin/home/index.vue'], () => {
    resolve(require('@/views/Admin/home/index.vue'));
  });
};
// Register
const Register = resolve => {
  require.ensure(['@/views/Admin/Register/index.vue'], () => {
    resolve(require('@/views/Admin/Register/index.vue'));
  });
};
// ProfileSettingAdmin
const ProfileSettingAdmin = resolve => {
  require.ensure(['@/views/Admin/ProfileSetting/index.vue'], () => {
    resolve(require('@/views/Admin/ProfileSetting/index.vue'));
  });
};

// Not Found
const NotFound = resolve => {
  require.ensure(['@/views/PageNotFound/NotFound.vue'], () => {
    resolve(require('@/views/PageNotFound/NotFound.vue'));
  });
};

// ALL EXPORT
export { Admin, Home, Products, Category, Register, ProfileSettingAdmin, NotFound };
