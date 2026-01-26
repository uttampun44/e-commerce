type LinkType = {
    name: string;
    url: string;
};

export const LinkTypes: { [key: string]: LinkType } = {
    DASHBOARD: { name: "Dashboard", url: "/dashboard", },
    PRODUCTS: { name: "Products", url: "/products" },
    ORDERS: { name: "Orders", url: "/orders" },
    CUSTOMERS: { name: "Customers", url: "/customers" },
    SETTINGS: { name: "Settings", url: "/settings" },
}