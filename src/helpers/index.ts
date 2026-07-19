import type { Color, Product, VariantProduct } from "../interfaces";

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
};

export const prepareProducts = (products: Product[]) => {
  return products.map((product) => {
    const colors = product.variants.reduce(
      (acc: Color[], variant: VariantProduct) => {
        const existingColor = acc.find((item) => item.color === variant.color);

        if (existingColor) {
          existingColor.price = Math.min(existingColor.price, variant.price);
        } else {
          acc.push({
            color: variant.color,
            price: variant.price,
            name: variant.color_name,
          });
        }

        return acc;
      },
      [],
    );

    const price = Math.min(...colors.map((item) => item.price));

    return {
      ...product,
      colors: colors.map(({ name, color }) => ({ name, color })),
      price,
      variants: product.variants,
    };
  });
};

export const formatDateLong = (date: string): string => {
  const dateObject = new Date(date);

  return dateObject.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getStatus = (status: string): string => {
  switch (status) {
    case "Pending":
      return "Pendiente";
    case "Paid":
      return "Pagado";
    case "Shipped":
      return "Enviado";
    case "Delivered":
      return "Entregado";
    case "Cancelled":
      return "Cancelado";
    default:
      return status;
  }
};
