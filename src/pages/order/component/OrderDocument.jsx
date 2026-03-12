import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, backgroundColor: "#ffffff", fontFamily: "Helvetica" },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#212529",
  },

  card: {
    marginBottom: 15,
    borderRadius: 4,
    border: "1pt solid #dee2e6",
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  cardHeader: {
    padding: 10,
    backgroundColor: "rgba(0,0,0,.03)",
    borderBottom: "1pt solid #dee2e6",
  },
  orderTitle: { fontSize: 14, fontWeight: "bold" },

  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    gap: 10,
  },

  productItem: {
    width: "30%",
    border: "1pt solid #dee2e6",
    borderRadius: 3,
    padding: 5,
  },
  thumbnail: { width: "100%", height: 50, borderRadius: 2, marginBottom: 5 },
  productTitle: { fontSize: 9, fontWeight: "bold", marginBottom: 2 },
  productText: { fontSize: 8, color: "#6c757d" },
});

const OrderDocument = ({ orders }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Order Page</Text>
      {orders.map((order) => (
        <View key={order.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.orderTitle}>Order #{order.id}</Text>
            <Text style={styles.productText}>
              Total: ${order.total.toFixed(2)}
            </Text>
          </View>

          <View style={styles.productGrid}>
            {order.products.map((product) => (
              <View key={product.id} style={styles.productItem}>
                <Image src={product.thumbnail} style={styles.thumbnail} />
                <Text style={styles.productTitle}>{product.title}</Text>
                <Text style={styles.productText}>Qty: {product.quantity}</Text>
                <Text style={styles.productText}>Price: ${product.price}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </Page>
  </Document>
);

export default OrderDocument;
