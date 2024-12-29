import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Svg, G, Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

// Define a type for the account names
type AccountType = "Общий" | "Mastercard" | "Visa";

// Define the structure for chart data
interface ChartData {
  name: string;
  spend: number;
  income: number;
  color: string;
}

// Define the structure for monthly data
interface MonthlyData {
  [month: string]: ChartData[];
}


export default function Index() {
  const [selectedAccount, setSelectedAccount] = useState<AccountType>("Общий");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number>(9); // Start with September (9)
  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnim = useState(new Animated.Value(-250))[0]; // The initial position of the menu is hidden
  const navigation = useNavigation();

  const handleNavigation = (screen: string) => {
    navigation.navigate(screen as never);
  }


  // Russian month names
  const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь",
    "Октябрь", "Ноябрь", "Декабрь"
  ];

  // Monthly data for each account
  const monthlyData: Record<AccountType, MonthlyData> = {
    Mastercard: {
      "9": [
        { name: "Продукты", spend: 600, income: 0, color: "#FF6384" },
        { name: "Транспорт", spend: 400, income: 0, color: "#36A2EB" },
        { name: "Красота", spend: 200, income: 0, color: "#FFCE56" },
        { name: "Здоровье", spend: 100, income: 0, color: "#4BC0C0" },
        { name: "ЖКХ", spend: 100, income: 0, color: "#9966FF" },
        { name: "Бензин", spend: 100, income: 0, color: "#FF9F40" },
        { name: "Зарплата", spend: 0, income: 2700, color: "#EE0ADF" },
      ],
      "10": [
        { name: "Продукты", spend: 550, income: 0, color: "#FF6384" },
        { name: "Транспорт", spend: 300, income: 0, color: "#36A2EB" },
        { name: "Красота", spend: 200, income: 0, color: "#FFCE56" },
        { name: "Здоровье", spend: 70, income: 0, color: "#4BC0C0" },
        { name: "ЖКХ", spend: 30, income: 0, color: "#9966FF" },
        { name: "Бензин", spend: 110, income: 0, color: "#FF9F40" },
        { name: "Зарплата", spend: 0, income: 2300, color: "#EE0ADF" },
      ],
    },
    Visa: {
      "9": [
        { name: "Продукты", spend: 500, income: 0, color: "#FF6384" },
        { name: "Транспорт", spend: 360, income: 0, color: "#36A2EB" },
        { name: "Красота", spend: 150, income: 0, color: "#FFCE56" },
        { name: "Здоровье", spend: 50, income: 0, color: "#4BC0C0" },
        { name: "ЖКХ", spend: 250, income: 0, color: "#9966FF" },
        { name: "Бензин", spend: 100, income: 0, color: "#FF9F40" },
        { name: "Зарплата", spend: 0, income: 2200, color: "#EE0ADF" },
      ],
      "10": [
        { name: "Продукты", spend: 450, income: 0, color: "#FF6384" },
        { name: "Транспорт", spend: 400, income: 0, color: "#36A2EB" },
        { name: "Красота", spend: 200, income: 0, color: "#FFCE56" },
        { name: "Здоровье", spend: 70, income: 0, color: "#4BC0C0" },
        { name: "ЖКХ", spend: 230, income: 0, color: "#9966FF" },
        { name: "Бензин", spend: 110, income: 0, color: "#FF9F40" },
        { name: "Зарплата", spend: 0, income: 3300, color: "#EE0ADF" },
      ],
    },
    Общий: {}
  };

  // Dynamically calculate chart data for 'Общий' account by summing spends from 'Mastercard' and 'Visa' for selected month
  const getCombinedChartData = () => {
    const MastercardData = monthlyData.Mastercard[selectedMonth.toString()] || [];
    const VisaData = monthlyData.Visa[selectedMonth.toString()] || [];

    return MastercardData.map((item, index) => {
      const VisaItem = VisaData[index];
      return {
        name: item.name,
        spend: item.spend + (VisaItem ? VisaItem.spend : 0),
        income: item.income + (VisaItem ? VisaItem.income : 0),
        color: item.color,
      };
    });
  };


  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.timing(menuAnim, {
      toValue: menuVisible ? -250 : 0, // Slide out or slide in
      duration: 300,
      useNativeDriver: true,
    }).start();
  };


  const chartData = selectedAccount === "Общий" ? getCombinedChartData() : monthlyData[selectedAccount][selectedMonth.toString()] || [];

  // Calculate total spend for the selected account (for 'Общий', it's the sum of Mastercard and Visa)
  const totalSpend = chartData.reduce((acc, item) => acc + item.spend, 0);
  const totalIncome = chartData.reduce((acc, item) => acc + item.income, 0);

  const remainingMoney = totalIncome - totalSpend;

  // Calculate population dynamically as a percentage of total spend
  const totalChartSpend = chartData.reduce((acc, item) => acc + item.spend, 0);
  const updatedChartData = chartData.map(item => ({
    ...item,
    population: (item.spend / totalChartSpend) * 100, // Calculate population based on spend percentage
  }));

  let startAngle = 0;

  const renderCircleSegments = () => {
    return updatedChartData.map((item, index) => {
      const percentage = item.population / 100;
      const endAngle = startAngle + percentage * 360;

      const radius = 120;
      const cx = 150;
      const cy = 150;

      const x1 = cx + radius * Math.cos((Math.PI * startAngle) / 180);
      const y1 = cy + radius * Math.sin((Math.PI * startAngle) / 180);
      const x2 = cx + radius * Math.cos((Math.PI * endAngle) / 180);
      const y2 = cy + radius * Math.sin((Math.PI * endAngle) / 180);

      const path = `
        M ${x1} ${y1}
        A ${radius} ${radius} 0 ${percentage > 0.5 ? 1 : 0} 1 ${x2} ${y2}
      `;

      startAngle = endAngle;

      return (
        <G key={index}>
          <Path
            d={path}
            fill="transparent"
            stroke={item.color}
            strokeWidth={12}
          />
        </G>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.topBarText}>Главная</Text>
        <TouchableOpacity>
          <Ionicons name="add" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.accountSelectorWrapper}>
          <TouchableOpacity
            style={styles.accountSelector}
            onPress={() => setDropdownVisible(!dropdownVisible)}
          >
            <Text style={styles.selectedAccount}>{selectedAccount}</Text>
            <Ionicons name={dropdownVisible ? "chevron-up-outline" : "chevron-down-outline"} size={20} color="#333" />
          </TouchableOpacity>

          {dropdownVisible && (
            <View style={styles.dropdown}>
              {["Общий", "Mastercard", "Visa"].map((account, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedAccount(account as AccountType);
                    setDropdownVisible(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>
                    {account === "Mastercard" ? "MasterCard *5993" : account === "Visa" ? "Visa *6790" : "Общий"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.monthNavigation}>
          <TouchableOpacity onPress={() => setSelectedMonth(selectedMonth === 1 ? 12 : selectedMonth - 1)}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.monthText}>
            {`${monthNames[selectedMonth - 1]} ${2024}`}
          </Text>
          <TouchableOpacity onPress={() => setSelectedMonth(selectedMonth === 12 ? 1 : selectedMonth + 1)}>
            <Ionicons name="arrow-forward" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={styles.amount}>${remainingMoney}</Text>
        </View>

        <View style={styles.chartWrapper}>
          <Svg width={300} height={300} viewBox="0 0 300 300" style={styles.chart}>
            {renderCircleSegments()}
          </Svg>

          <View style={styles.legend}>
            {updatedChartData
              .filter((item) => item.spend > 0) // Filter out items with 0 spend
              .map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View style={[styles.colorBlock, { backgroundColor: item.color }]} />
                  <Text style={styles.legendText}>{item.name}</Text>
                </View>
              ))}
          </View>

        </View>

        <View style={styles.card}>
          <View style={styles.summary}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Расходы</Text>
              <Text style={styles.summaryValue}>${totalSpend}</Text>
            </View>
            <View style={styles.separatorCard} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Доходы</Text>
              <Text style={styles.summaryValue}>${totalIncome}</Text>
            </View>
          </View>
        </View>

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
  accountSelectorWrapper: {
    marginBottom: 20,
    alignItems: "center",
  },
  accountSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 8,
    width: "100%",
    justifyContent: "center",
  },
  selectedAccount: {
    fontSize: 16,
    color: "#333",
  },
  dropdown: {
    position: "absolute",
    top: 50,
    left: 20,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 10,
    zIndex: 1,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },
  monthNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  amount: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  chartWrapper: {
    position: "relative",
    alignItems: "center",
    marginBottom: 20,
  },
  chart: {
    alignSelf: "center",
  },
  legend: {
    position: "absolute",
    top: "25%",
    left: "10%",
    width: "80%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  card: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  separatorCard: {
    width: 1,
    height: "100%",
    backgroundColor: "#ccc"
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    alignItems: "center"
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 16,
    color: "#555",
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "200",
    color: "#333",
  },
  colorBlock: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  legendText: {
    fontSize: 12,
    color: "#333",
  },
  ad: {
    textAlign: "center",
    fontSize: 14,
    color: "#bbb",
    marginTop: 10,
  },
  footer: {
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    marginTop: "15%"
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
  closeButton: {
    paddingTop: "15%",
    padding: 5,
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1001, // Position it at the top-right corner of the menu
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
