import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type AccountType = "Общий" | "Mastercard" | "Visa";

interface Operation {
    name: string;
    amount: number;
}

// Define the structure for chart data
interface ChartData {
    name: string;
    icon: string;
    spend: number;
    income: number;
    color: string;
    operations: Operation[];
}

// Define the structure for monthly data
interface MonthlyData {
    [month: string]: ChartData[];
}

export default function Analytics() {
    const [selectedAccount, setSelectedAccount] = useState<AccountType>("Общий");
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState<number>(9); // Start with September (9)
    const [menuVisible, setMenuVisible] = useState(false);
    const menuAnim = useState(new Animated.Value(-250))[0];
    const navigation = useNavigation();

    const handleNavigation = (screen: string) => {
        navigation.navigate(screen as never);
    };

    // Russian month names
    const monthNames = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь",
        "Октябрь", "Ноябрь", "Декабрь",
    ];

    const monthlyData: Record<AccountType, MonthlyData> = {
        Mastercard: {
            "9": [
                {
                    name: "Продукты",
                    icon: "fast-food-outline",
                    spend: 600,
                    income: 0,
                    color: "#FF6384",
                    operations: [
                        { name: "Пятерочка", amount: 400 },
                        { name: "Мария-Ра", amount: 200 },
                    ],
                },
                {
                    name: "Транспорт",
                    icon: "bus-outline",
                    spend: 400,
                    income: 0,
                    color: "#36A2EB",
                    operations: [
                        { name: "Проездной", amount: 100 },
                        { name: "Такси", amount: 300 },
                    ],
                },
                {
                    name: "Красота",
                    icon: "brush-outline",
                    spend: 200,
                    income: 0,
                    color: "#FFCE56",
                    operations: [
                        { name: "Салон красоты", amount: 150 },
                        { name: "Косметика", amount: 50 },
                    ],
                },
                {
                    name: "Здоровье",
                    icon: "medkit-outline",
                    spend: 100,
                    income: 0,
                    color: "#4BC0C0",
                    operations: [
                        { name: "Аптека", amount: 60 },
                        { name: "Витамины", amount: 40 },
                    ],
                },
                {
                    name: "ЖКХ",
                    icon: "home-outline",
                    spend: 100,
                    income: 0,
                    color: "#9966FF",
                    operations: [
                        { name: "Электричество", amount: 50 },
                        { name: "Вода", amount: 50 },
                    ],
                },
                {
                    name: "Бензин",
                    icon: "car-sport-outline",
                    spend: 100,
                    income: 0,
                    color: "#FF9F40",
                    operations: [
                        { name: "АЗС Лукойл", amount: 70 },
                        { name: "АЗС Газпром", amount: 30 },
                    ],
                },
                {
                    name: "Зарплата",
                    icon: "cash-outline",
                    spend: 0,
                    income: 2700,
                    color: "#EE0ADF",
                    operations: [
                        { name: "Основная работа", amount: 2000 },
                        { name: "Фриланс", amount: 700 },
                    ],
                },
            ],
            "10":
                [
                    {
                        name: "Продукты",
                        icon: "fast-food-outline",
                        spend: 500,
                        income: 0,
                        color: "#FF6384",
                        operations: [
                            { name: "Лента", amount: 300 },
                            { name: "Ашан", amount: 200 },
                        ],
                    },
                    {
                        name: "Транспорт",
                        icon: "bus-outline",
                        spend: 350,
                        income: 0,
                        color: "#36A2EB",
                        operations: [
                            { name: "Электричка", amount: 200 },
                            { name: "Маршрутка", amount: 150 },
                        ],
                    },
                    {
                        name: "Здоровье",
                        icon: "medkit-outline",
                        spend: 120,
                        income: 0,
                        color: "#4BC0C0",
                        operations: [
                            { name: "Терапевт", amount: 70 },
                            { name: "Аптека", amount: 50 },
                        ],
                    },
                    {
                        name: "ЖКХ",
                        icon: "home-outline",
                        spend: 120,
                        income: 0,
                        color: "#9966FF",
                        operations: [
                            { name: "Капремонт", amount: 60 },
                            { name: "Вывоз мусора", amount: 60 },
                        ],
                    },
                    {
                        name: "Бензин",
                        icon: "car-sport-outline",
                        spend: 150,
                        income: 0,
                        color: "#FF9F40",
                        operations: [
                            { name: "АЗС BP", amount: 100 },
                            { name: "АЗС Shell", amount: 50 },
                        ],
                    },
                    {
                        name: "Зарплата",
                        icon: "cash-outline",
                        spend: 0,
                        income: 2600,
                        color: "#EE0ADF",
                        operations: [
                            { name: "Оклад", amount: 2200 },
                            { name: "Премия", amount: 400 },
                        ],
                    },
                ],
        },
        Visa: {
            "9": [
                {
                    name: "Продукты",
                    icon: "fast-food-outline",
                    spend: 500,
                    income: 0,
                    color: "#FF6384",
                    operations: [
                        { name: "Дикси", amount: 300 },
                        { name: "Магнит", amount: 200 },
                    ],
                },
                {
                    name: "Транспорт",
                    icon: "bus-outline",
                    spend: 360,
                    income: 0,
                    color: "#36A2EB",
                    operations: [
                        { name: "Автобус", amount: 160 },
                        { name: "Такси", amount: 200 },
                    ],
                },
                {
                    name: "Красота",
                    icon: "brush-outline",
                    spend: 150,
                    income: 0,
                    color: "#FFCE56",
                    operations: [
                        { name: "Парикмахерская", amount: 100 },
                        { name: "Крем для лица", amount: 50 },
                    ],
                },
                {
                    name: "Здоровье",
                    icon: "medkit-outline",
                    spend: 50,
                    income: 0,
                    color: "#4BC0C0",
                    operations: [
                        { name: "Таблетки", amount: 30 },
                        { name: "Витамины", amount: 20 },
                    ],
                },
                {
                    name: "ЖКХ",
                    icon: "home-outline",
                    spend: 250,
                    income: 0,
                    color: "#9966FF",
                    operations: [
                        { name: "Электричество", amount: 150 },
                        { name: "Вода", amount: 100 },
                    ],
                },
                {
                    name: "Бензин",
                    icon: "car-sport-outline",
                    spend: 100,
                    income: 0,
                    color: "#FF9F40",
                    operations: [
                        { name: "АЗС Лукойл", amount: 60 },
                        { name: "АЗС Роснефть", amount: 40 },
                    ],
                },
                {
                    name: "Зарплата",
                    icon: "cash-outline",
                    spend: 0,
                    income: 2200,
                    color: "#EE0ADF",
                    operations: [
                        { name: "Основная работа", amount: 1700 },
                        { name: "Фриланс", amount: 500 },
                    ],
                },
            ],
            "10": [
                {
                    name: "Продукты",
                    icon: "fast-food-outline",
                    spend: 450,
                    income: 0,
                    color: "#FF6384",
                    operations: [
                        { name: "Перекресток", amount: 250 },
                        { name: "Пятерочка", amount: 200 },
                    ],
                },
                {
                    name: "Транспорт",
                    icon: "bus-outline",
                    spend: 400,
                    income: 0,
                    color: "#36A2EB",
                    operations: [
                        { name: "Проездной", amount: 250 },
                        { name: "Такси", amount: 150 },
                    ],
                },
                {
                    name: "Красота",
                    icon: "brush-outline",
                    spend: 200,
                    income: 0,
                    color: "#FFCE56",
                    operations: [
                        { name: "Маникюр", amount: 120 },
                        { name: "Шампунь", amount: 80 },
                    ],
                },
                {
                    name: "Здоровье",
                    icon: "medkit-outline",
                    spend: 70,
                    income: 0,
                    color: "#4BC0C0",
                    operations: [
                        { name: "Аптека", amount: 50 },
                        { name: "Витамины", amount: 20 },
                    ],
                },
                {
                    name: "ЖКХ",
                    icon: "home-outline",
                    spend: 230,
                    income: 0,
                    color: "#9966FF",
                    operations: [
                        { name: "Газ", amount: 130 },
                        { name: "Вода", amount: 100 },
                    ],
                },
                {
                    name: "Бензин",
                    icon: "car-sport-outline",
                    spend: 110,
                    income: 0,
                    color: "#FF9F40",
                    operations: [
                        { name: "АЗС Газпром", amount: 70 },
                        { name: "АЗС Shell", amount: 40 },
                    ],
                },
                {
                    name: "Зарплата",
                    icon: "cash-outline",
                    spend: 0,
                    income: 2300,
                    color: "#EE0ADF",
                    operations: [
                        { name: "Основной доход", amount: 1900 },
                        { name: "Подработка", amount: 400 },
                    ],
                },
            ],
        },
        Общий: {},
    };

    // Combine Mastercard and Visa data for "Общий" account
    const getCombinedChartData = () => {
        const MastercardData = monthlyData.Mastercard[selectedMonth.toString()] || [];
        const VisaData = monthlyData.Visa[selectedMonth.toString()] || [];
        const combinedData: ChartData[] = [];

        const allCategories = new Set([
            ...MastercardData.map((item) => item.name),
            ...VisaData.map((item) => item.name),
        ]);

        allCategories.forEach((categoryName) => {
            const MastercardItem = MastercardData.find((item) => item.name === categoryName);
            const VisaItem = VisaData.find((item) => item.name === categoryName);

            // Combine operations from both Mastercard and Visa and group by operation name
            const allOperations = [
                ...(MastercardItem?.operations || []),
                ...(VisaItem?.operations || []),
            ];

            // Group operations by name and sum their amounts
            const groupedOperations: { [name: string]: number } = {};
            allOperations.forEach((operation) => {
                if (groupedOperations[operation.name]) {
                    groupedOperations[operation.name] += operation.amount;
                } else {
                    groupedOperations[operation.name] = operation.amount;
                }
            });

            // Convert grouped operations back into the format of the original data
            const summedOperations = Object.entries(groupedOperations).map(([name, amount]) => ({
                name,
                amount,
            }));

            combinedData.push({
                name: categoryName,
                icon: MastercardItem?.icon || VisaItem?.icon || "help-outline",
                spend: (MastercardItem?.spend || 0) + (VisaItem?.spend || 0),
                income: (MastercardItem?.income || 0) + (VisaItem?.income || 0),
                color: MastercardItem?.color || VisaItem?.color || "#000",
                operations: summedOperations,
            });
        });

        return combinedData;
    };


    const chartData =
        selectedAccount === "Общий"
            ? getCombinedChartData()
            : monthlyData[selectedAccount][selectedMonth.toString()] || [];

    // Calculate totals
    const totalSpend = chartData.reduce((acc, item) => acc + item.spend, 0);
    const totalIncome = chartData.reduce((acc, item) => acc + item.income, 0);
    const remainingMoney = totalIncome - totalSpend;

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
        Animated.timing(menuAnim, {
            toValue: menuVisible ? -250 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={toggleMenu}>
                    <Ionicons name="menu" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.topBarText}>Аналитика</Text>
                <TouchableOpacity>
                    <Ionicons name="download-outline" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView style={styles.content}>
                {/* Account Selector */}
                <View style={styles.accountSelectorWrapper}>
                    <TouchableOpacity
                        style={styles.accountSelector}
                        onPress={() => setDropdownVisible(!dropdownVisible)}
                    >
                        <Text style={styles.selectedAccount}>{selectedAccount}</Text>
                        <Ionicons
                            name={dropdownVisible ? "chevron-up-outline" : "chevron-down-outline"}
                            size={20}
                            color="#333"
                        />
                    </TouchableOpacity>
                    {dropdownVisible && (
                        <View style={styles.dropdown}>
                            {["Общий", "Mastercard", "Visa"].map((account) => (
                                <TouchableOpacity
                                    key={account}
                                    style={styles.dropdownItem}
                                    onPress={() => {
                                        setSelectedAccount(account as AccountType);
                                        setDropdownVisible(false);
                                    }}
                                >
                                    <Text style={styles.dropdownItemText}>{account}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                {/* Month Selector */}
                <View style={styles.monthNavigation}>
                    <TouchableOpacity
                        onPress={() => setSelectedMonth(selectedMonth === 1 ? 12 : selectedMonth - 1)}
                    >
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.monthText}>{monthNames[selectedMonth - 1]} 2024</Text>
                    <TouchableOpacity
                        onPress={() => setSelectedMonth(selectedMonth === 12 ? 1 : selectedMonth + 1)}
                    >
                        <Ionicons name="arrow-forward" size={24} color="#333" />
                    </TouchableOpacity>
                </View>

                {/* Remaining Money */}
                <View style={styles.header}>
                    <Text style={styles.amount}>${remainingMoney.toFixed(2)}</Text>
                </View>

                {/* Category Cards */}
                {chartData
                    .sort((a, b) => {
                        const totalAmountA = a.spend === 0 ? a.income : a.spend;
                        const totalAmountB = b.spend === 0 ? b.income : b.spend;
                        return totalAmountB - totalAmountA; // Sorting categories in descending order
                    })
                    .map((category) => {
                        const totalAmount = category.spend === 0 ? category.income : category.spend;

                        // Sort the operations inside each category by their amount
                        const sortedOperations = category.operations.sort((opA, opB) => opB.amount - opA.amount);

                        return (
                            <View key={category.name} style={styles.card}>
                                <View style={styles.cardHeader}>
                                    <Ionicons name={category.icon} size={24} color={category.color} />
                                    <Text style={styles.cardTitle}>{category.name}</Text>
                                    <Text style={styles.cardAmount}>${totalAmount}</Text>
                                </View>
                                <View style={styles.operations}>
                                    {sortedOperations.map((operation, index) => (
                                        <View key={index} style={styles.operationItem}>
                                            <Text style={styles.operationName}>{operation.name}</Text>
                                            <Text style={styles.operationAmount}>${operation.amount}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        );
                    })}



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
        paddingHorizontal: 16,
    },
    accountSelectorWrapper: {
        marginTop: 16,
        marginBottom: 8,
    },
    accountSelector: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    selectedAccount: {
        fontSize: 16,
        color: "#333",
    },
    dropdown: {
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        marginTop: 4,
    },
    dropdownItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    dropdownItemText: {
        fontSize: 16,
        color: "#333",
    },
    monthNavigation: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 16,
    },
    monthText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    header: {
        alignItems: "center",
        marginVertical: 16,
    },
    amount: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#333",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        flex: 1,
        marginLeft: 8,
    },
    cardAmount: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    operations: {
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        marginTop: 8,
        paddingTop: 8,
    },
    operationItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    operationName: {
        fontSize: 16,
        color: "#555",
    },
    operationAmount: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
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
        marginVertical: "15%"
    },
});

