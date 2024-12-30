import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type Payment = {
  id: number;
  logo: string;
  name: string;
  amount: number;
  date: string;
};

type PaymentsData = {
  subscriptions: Payment[];
  bills: Payment[];
  debts: Payment[];
};

type Tab = {
  name: string;
  value: "subscriptions" | "bills" | "debts";
};

export default function RegularPayments() {
  const [selectedTab, setSelectedTab] = useState<"subscriptions" | "bills" | "debts">("subscriptions");
  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnim = useState(new Animated.Value(-250))[0];
  const navigation = useNavigation();

  const handleNavigation = (screen: string) => {
    navigation.navigate(screen as never);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.timing(menuAnim, {
      toValue: menuVisible ? -250 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const paymentsData: PaymentsData = {
    subscriptions: [
      { id: 1, logo: "🛒", name: "Netflix", amount: 15.99, date: "01/01/2024" },
      { id: 2, logo: "🎮", name: "Xbox Live", amount: 9.99, date: "02/01/2024" },
      { id: 3, logo: "🎧", name: "Яндекс Плюс", amount: 2.99, date: "05/01/2024" },
    ],
    bills: [
      { id: 1, logo: "💡", name: "Электричество", amount: 30.00, date: "01/01/2024" },
      { id: 2, logo: "🌐", name: "Интернет", amount: 20.00, date: "05/01/2024" },
    ],
    debts: [
      { id: 1, logo: "💳", name: "Кредитная карточка", amount: 120.00, date: "01/01/2024" },
      { id: 2, logo: "🏠", name: "Аренда", amount: 300.00, date: "15/01/2024" },
    ],
  };

  const tabs: Tab[] = [
    { name: "Подписки", value: "subscriptions" },
    { name: "Счета", value: "bills" },
    { name: "Долги", value: "debts" },
  ];

  const selectedPayments = paymentsData[selectedTab];
  const totalAmount = selectedPayments.reduce((acc, item) => acc + item.amount, 0).toFixed(2);

  return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons name="menu" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.topBarText}>Регулярные платежи</Text>
          <TouchableOpacity>
            <Ionicons name="add" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.tabsWrapper}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.value}
                    style={[styles.tab, selectedTab === tab.value && styles.selectedTab]}
                    onPress={() => setSelectedTab(tab.value)}
                >
                  <Text style={[styles.tabText, selectedTab === tab.value && styles.selectedTabText]}>
                    {tab.name}
                  </Text>
                </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.amountText}>
            Ваш ежемесячный
          </Text>
          <Text style={styles.amountText}>
            платеж по {selectedTab === "subscriptions" ? "подпискам" : selectedTab === "bills" ? "счетам" : "долгам"}
          </Text>

          <Text style={styles.totalAmount}>${totalAmount}</Text>

          {selectedPayments.map((payment) => (
              <View key={payment.id} style={styles.paymentCard}>
                <View style={styles.paymentDetails}>
                  <Text style={styles.paymentLogo}>{payment.logo}</Text>
                  <View style={styles.paymentInfo}>
                    <Text style={styles.paymentName}>{payment.name}</Text>
                    <Text style={styles.paymentAmount}>${payment.amount.toFixed(2)}</Text>
                  </View>
                  <Text style={styles.paymentDate}>{payment.date}</Text>
                  <View style={styles.paymentDateContainer}>
                    <Ionicons name="arrow-forward" size={18} color="#333" />
                  </View>
                </View>
              </View>
          ))}

          <View style={styles.footer}>
            <Text style={styles.ad}>Тут могла быть ваша реклама</Text>
          </View>
        </ScrollView>
        <Animated.View style={[styles.menu, { transform: [{ translateX: menuAnim }] }]}>
          <View style={styles.menuHeader}>
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoText}>SS</Text>
              </View>
              <View style={styles.logoTextContainer}>
                <Text style={styles.logoMainText}>SpendSphere</Text>
                <Text style={styles.logoSlogan}>будь уверен</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#ccc" />
          </TouchableOpacity>
          <View style={styles.profileContainer}>
            <View style={styles.profileCircle}>
              <Text style={styles.profilePhotoText}>A</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileText}>Мой профиль</Text>
              <Text style={styles.profileName}>Имя Фамилия</Text>
            </View>
            <TouchableOpacity style={styles.profileArrowButton}>
              <Ionicons name="arrow-forward" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.screenList}>
            {["Главная", "Аналитика", "Регулярные платежи", "Прогноз бюджета", "Группы", "Поддержка"].map((screen, index) => (
                <View key={index}>
                  <TouchableOpacity
                      style={styles.screenItem}
                      onPress={() => handleNavigation(screen)}>
                    <Text style={styles.screenItemText}>{screen}</Text>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                </View>
            ))}
          </View>
        </Animated.View>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: "15%",
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  topBarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  tabsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  selectedTab: {
    backgroundColor: "#fff",
  },
  tabText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  selectedTabText: {
    fontWeight: "bold",
    color: "#7E5CAD",
    borderBottomWidth: 2,
    borderBottomColor: "#7E5CAD",
  },
  amountText: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "200",
    color: "#333",
    marginBottom: 10,
  },
  totalAmount: {
    fontSize: 56,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  paymentCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  paymentDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paymentLogo: {
    fontSize: 24,
  },
  paymentInfo: {
    flex: 1,
    marginLeft: 10,
  },
  paymentName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  paymentAmount: {
    fontSize: 14,
    color: "#555",
  },
  paymentDateContainer: {
    paddingLeft: "5%",
    alignItems: "center",
  },
  paymentDate: {
    fontSize: 12,
    color: "#aaa",
  },
  footer: {
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  ad: {
    fontSize: 14,
    color: "#aaa",
  },
  closeButton: {
    paddingTop: "15%",
    padding: 5,
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1001,
  },
  logoText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  logoMainText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  logoSlogan: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  menu: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 250,
    backgroundColor: "#fff",
    paddingTop: "15%",
    paddingHorizontal: 20,
    zIndex: 1000,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  menuItem: {
    paddingVertical: 15,
  },
  menuItemText: {
    fontSize: 18,
    color: "#fff",
  },
  logoContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF6384",
    justifyContent: "center",
    alignItems: "center",
  },
  logoTextContainer: {
    flexDirection: "column",
    marginLeft: 10,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePhotoText: {
    color: "#fff",
    fontSize: 20,
  },
  profileInfo: {
    marginLeft: 10,
  },
  profileText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  profileName: {
    fontSize: 14,
    color: "#888",
  },
  profileArrowButton: {
    marginLeft: "auto",
  },
  screenList: {
    marginTop: 10,
  },
  screenItem: {
    paddingVertical: 15,
  },
  screenItemText: {
    fontSize: 16,
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
  },
});
