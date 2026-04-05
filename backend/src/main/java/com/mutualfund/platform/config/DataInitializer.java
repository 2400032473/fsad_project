package com.mutualfund.platform.config;

import com.mutualfund.platform.model.*;
import com.mutualfund.platform.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MutualFundRepository mutualFundRepository;

    @Autowired
    private EducationalContentRepository contentRepository;

    @Autowired
    private InvestmentRepository investmentRepository;

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            seedUsers();
            seedMutualFunds();
            seedEducationalContent();
            seedInvestments();
            seedReports();
            System.out.println("=== Sample data initialized successfully ===");
        }
    }

    private void seedUsers() {
        userRepository.save(User.builder()
                .username("admin")
                .email("admin@mutualfund.com")
                .password(passwordEncoder.encode("admin123"))
                .fullName("System Administrator")
                .role(Role.ADMIN)
                .phone("9876543210")
                .active(true)
                .build());

        userRepository.save(User.builder()
                .username("investor1")
                .email("investor1@email.com")
                .password(passwordEncoder.encode("investor123"))
                .fullName("Rajesh Kumar")
                .role(Role.INVESTOR)
                .phone("9876543211")
                .active(true)
                .build());

        userRepository.save(User.builder()
                .username("investor2")
                .email("investor2@email.com")
                .password(passwordEncoder.encode("investor123"))
                .fullName("Priya Sharma")
                .role(Role.INVESTOR)
                .phone("9876543212")
                .active(true)
                .build());

        userRepository.save(User.builder()
                .username("advisor1")
                .email("advisor1@mutualfund.com")
                .password(passwordEncoder.encode("advisor123"))
                .fullName("Arun Mehta")
                .role(Role.FINANCIAL_ADVISOR)
                .phone("9876543213")
                .active(true)
                .build());

        userRepository.save(User.builder()
                .username("analyst1")
                .email("analyst1@mutualfund.com")
                .password(passwordEncoder.encode("analyst123"))
                .fullName("Neha Gupta")
                .role(Role.DATA_ANALYST)
                .phone("9876543214")
                .active(true)
                .build());
    }

    private void seedMutualFunds() {
        mutualFundRepository.save(MutualFund.builder()
                .name("SBI Bluechip Fund")
                .category(FundCategory.EQUITY)
                .fundHouse("SBI Mutual Fund")
                .navValue(68.45)
                .expenseRatio(1.72)
                .riskLevel(RiskLevel.MODERATE)
                .minInvestment(5000.0)
                .returns1Year(15.8)
                .returns3Year(12.5)
                .returns5Year(14.2)
                .fundSize(43250.0)
                .description("SBI Bluechip Fund is a large-cap equity fund that invests predominantly in large-cap companies. The fund aims to provide long-term capital appreciation by investing in a diversified portfolio of equity and equity-related instruments of large-cap companies.")
                .fundManager("Sohini Andani")
                .launchDate(LocalDate.of(2006, 2, 14))
                .rating(4.5)
                .build());

        mutualFundRepository.save(MutualFund.builder()
                .name("HDFC Mid-Cap Opportunities Fund")
                .category(FundCategory.EQUITY)
                .fundHouse("HDFC Mutual Fund")
                .navValue(112.30)
                .expenseRatio(1.65)
                .riskLevel(RiskLevel.HIGH)
                .minInvestment(5000.0)
                .returns1Year(22.4)
                .returns3Year(18.7)
                .returns5Year(16.9)
                .fundSize(38500.0)
                .description("HDFC Mid-Cap Opportunities Fund invests predominantly in mid-cap stocks to generate long-term capital appreciation. The fund follows a bottom-up stock selection approach with focus on quality businesses.")
                .fundManager("Chirag Setalvad")
                .launchDate(LocalDate.of(2007, 6, 25))
                .rating(4.8)
                .build());

        mutualFundRepository.save(MutualFund.builder()
                .name("ICICI Prudential Balanced Advantage Fund")
                .category(FundCategory.HYBRID)
                .fundHouse("ICICI Prudential Mutual Fund")
                .navValue(55.20)
                .expenseRatio(1.58)
                .riskLevel(RiskLevel.MODERATE)
                .minInvestment(1000.0)
                .returns1Year(11.2)
                .returns3Year(10.8)
                .returns5Year(12.1)
                .fundSize(52100.0)
                .description("A dynamic asset allocation fund that dynamically manages allocation between equity and debt based on market conditions. Suitable for conservative investors seeking equity exposure with downside protection.")
                .fundManager("Sankaran Naren")
                .launchDate(LocalDate.of(2006, 12, 31))
                .rating(4.3)
                .build());

        mutualFundRepository.save(MutualFund.builder()
                .name("Axis Long Term Equity Fund")
                .category(FundCategory.ELSS)
                .fundHouse("Axis Mutual Fund")
                .navValue(78.90)
                .expenseRatio(1.54)
                .riskLevel(RiskLevel.HIGH)
                .minInvestment(500.0)
                .returns1Year(18.6)
                .returns3Year(15.2)
                .returns5Year(13.8)
                .fundSize(32800.0)
                .description("An ELSS (Equity Linked Savings Scheme) fund offering tax benefits under Section 80C with a 3-year lock-in period. Invests in a concentrated portfolio of high-quality growth stocks.")
                .fundManager("Jinesh Gopani")
                .launchDate(LocalDate.of(2009, 12, 29))
                .rating(4.6)
                .build());

        mutualFundRepository.save(MutualFund.builder()
                .name("Nippon India Liquid Fund")
                .category(FundCategory.LIQUID)
                .fundHouse("Nippon India Mutual Fund")
                .navValue(5125.40)
                .expenseRatio(0.20)
                .riskLevel(RiskLevel.LOW)
                .minInvestment(100.0)
                .returns1Year(6.8)
                .returns3Year(5.9)
                .returns5Year(6.2)
                .fundSize(28900.0)
                .description("A liquid fund that invests in money market instruments and short-term debt securities with maturity up to 91 days. Ideal for parking surplus funds for short duration.")
                .fundManager("Anju Chhajer")
                .launchDate(LocalDate.of(2004, 5, 10))
                .rating(4.0)
                .build());

        mutualFundRepository.save(MutualFund.builder()
                .name("UTI Nifty 50 Index Fund")
                .category(FundCategory.INDEX)
                .fundHouse("UTI Mutual Fund")
                .navValue(142.75)
                .expenseRatio(0.18)
                .riskLevel(RiskLevel.MODERATE)
                .minInvestment(1000.0)
                .returns1Year(14.5)
                .returns3Year(13.1)
                .returns5Year(15.0)
                .fundSize(15200.0)
                .description("A passively managed index fund that replicates the Nifty 50 index. Offers market returns at very low cost, making it ideal for long-term wealth creation through systematic investment.")
                .fundManager("Sharwan Kumar Goyal")
                .launchDate(LocalDate.of(2000, 3, 6))
                .rating(4.2)
                .build());

        mutualFundRepository.save(MutualFund.builder()
                .name("HDFC Corporate Bond Fund")
                .category(FundCategory.DEBT)
                .fundHouse("HDFC Mutual Fund")
                .navValue(26.80)
                .expenseRatio(0.45)
                .riskLevel(RiskLevel.LOW)
                .minInvestment(5000.0)
                .returns1Year(7.9)
                .returns3Year(7.2)
                .returns5Year(8.1)
                .fundSize(27600.0)
                .description("A debt fund that predominantly invests in AA+ and above rated corporate bonds. Aims to generate regular income through a portfolio of high-quality fixed income instruments.")
                .fundManager("Anil Bamboli")
                .launchDate(LocalDate.of(2010, 6, 15))
                .rating(4.1)
                .build());

        mutualFundRepository.save(MutualFund.builder()
                .name("Tata Digital India Fund")
                .category(FundCategory.SECTORAL)
                .fundHouse("Tata Mutual Fund")
                .navValue(42.15)
                .expenseRatio(1.85)
                .riskLevel(RiskLevel.VERY_HIGH)
                .minInvestment(5000.0)
                .returns1Year(28.5)
                .returns3Year(24.3)
                .returns5Year(22.1)
                .fundSize(9800.0)
                .description("A sectoral fund investing in IT and technology companies. High growth potential but concentrated sector exposure increases risk. Suitable for investors with high risk appetite and long horizon.")
                .fundManager("Meeta Shetty")
                .launchDate(LocalDate.of(2015, 12, 28))
                .rating(4.4)
                .build());

        mutualFundRepository.save(MutualFund.builder()
                .name("Kotak Small Cap Fund")
                .category(FundCategory.EQUITY)
                .fundHouse("Kotak Mutual Fund")
                .navValue(198.60)
                .expenseRatio(1.78)
                .riskLevel(RiskLevel.VERY_HIGH)
                .minInvestment(5000.0)
                .returns1Year(32.1)
                .returns3Year(28.5)
                .returns5Year(24.7)
                .fundSize(12400.0)
                .description("A small-cap equity fund that invests in emerging companies with high growth potential. Carries significant market risk but offers the possibility of substantial returns over long periods.")
                .fundManager("Pankaj Tibrewal")
                .launchDate(LocalDate.of(2005, 2, 24))
                .rating(4.7)
                .build());

        mutualFundRepository.save(MutualFund.builder()
                .name("Aditya Birla Sun Life Tax Relief 96")
                .category(FundCategory.ELSS)
                .fundHouse("Aditya Birla Sun Life Mutual Fund")
                .navValue(45.30)
                .expenseRatio(1.69)
                .riskLevel(RiskLevel.HIGH)
                .minInvestment(500.0)
                .returns1Year(16.4)
                .returns3Year(14.1)
                .returns5Year(13.5)
                .fundSize(18700.0)
                .description("One of the oldest ELSS funds providing tax savings under Section 80C. The fund follows a multi-cap approach with a blend of value and growth investing styles.")
                .fundManager("Ajay Garg")
                .launchDate(LocalDate.of(1996, 3, 10))
                .rating(4.0)
                .build());
    }

    private void seedEducationalContent() {
        User advisor = userRepository.findByUsername("advisor1").orElse(null);

        contentRepository.save(EducationalContent.builder()
                .title("What are Mutual Funds? A Beginner's Guide")
                .content("A mutual fund is a type of financial vehicle made up of a pool of money collected from many investors to invest in securities like stocks, bonds, money market instruments, and other assets. Mutual funds are operated by professional money managers, who allocate the fund's assets and attempt to produce capital gains or income for the fund's investors.\n\nKey Benefits:\n1. Professional Management - Expert fund managers handle investment decisions\n2. Diversification - Your money is spread across multiple securities\n3. Liquidity - You can buy or sell fund units on any business day\n4. Affordability - Start investing with as low as ₹500\n5. Transparency - Regular disclosure of portfolio holdings\n\nTypes of Mutual Funds:\n- Equity Funds: Invest primarily in stocks\n- Debt Funds: Invest in fixed income instruments\n- Hybrid Funds: Mix of equity and debt\n- Index Funds: Track a market index\n- ELSS: Tax-saving funds with 3-year lock-in")
                .category("Basics")
                .author(advisor)
                .tags("mutual funds,basics,investing,beginners")
                .published(true)
                .build());

        contentRepository.save(EducationalContent.builder()
                .title("Understanding Risk in Mutual Fund Investments")
                .content("Every investment carries some degree of risk. Mutual fund risks include market risk, interest rate risk, credit risk, and liquidity risk.\n\nTypes of Risk:\n1. Market Risk - The risk that the value of a security will decrease due to market factors\n2. Interest Rate Risk - Risk that rising interest rates will reduce the value of fixed income securities\n3. Credit Risk - The risk that a bond issuer will default on payments\n4. Liquidity Risk - The risk that an investment cannot be sold quickly enough\n5. Inflation Risk - The risk that returns may not keep pace with inflation\n\nRisk-Return Relationship:\n- Low Risk: Liquid funds, overnight funds (Expected returns: 4-7%)\n- Moderate Risk: Balanced/Hybrid funds, large-cap funds (Expected returns: 10-14%)\n- High Risk: Mid-cap and small-cap funds (Expected returns: 15-25%)\n- Very High Risk: Sectoral and thematic funds (Expected returns: variable)\n\nHow to Manage Risk:\n- Diversify across fund categories\n- Invest for the long term\n- Use SIP to average out market volatility\n- Match fund risk with your risk tolerance")
                .category("Risk Management")
                .author(advisor)
                .tags("risk,investment,portfolio,volatility")
                .published(true)
                .build());

        contentRepository.save(EducationalContent.builder()
                .title("SIP vs Lump Sum: Which Investment Strategy is Better?")
                .content("SIP (Systematic Investment Plan) and Lump Sum are two different approaches to investing in mutual funds.\n\nSIP (Systematic Investment Plan):\n- Invest a fixed amount at regular intervals (monthly/quarterly)\n- Benefits from rupee cost averaging\n- Reduces impact of market volatility\n- Ideal for salaried individuals\n- No need to time the market\n- Start with as low as ₹500/month\n\nLump Sum Investment:\n- Invest a large amount at once\n- Better when markets are at low levels\n- Suitable when you receive a windfall (bonus, inheritance)\n- Time in market matters more than timing the market\n- Higher potential returns in rising markets\n\nWhen to Choose SIP:\n- Regular income earner\n- New to investing\n- Want to build discipline\n- Market is volatile or at highs\n\nWhen to Choose Lump Sum:\n- Have surplus funds available\n- Market correction has occurred\n- Short-term goals with clear timeline\n- Experienced investor comfortable with market timing")
                .category("Investment Strategy")
                .author(advisor)
                .tags("SIP,lump sum,strategy,investing")
                .published(true)
                .build());

        contentRepository.save(EducationalContent.builder()
                .title("Tax Benefits of ELSS Mutual Funds")
                .content("Equity Linked Savings Scheme (ELSS) is a type of mutual fund that offers tax benefits under Section 80C of the Income Tax Act.\n\nKey Features of ELSS:\n- Tax deduction up to ₹1.5 lakh under Section 80C\n- Shortest lock-in period among 80C investments (3 years)\n- Potential for higher returns compared to other tax-saving options\n- Can invest through SIP or lump sum\n\nComparison with Other 80C Options:\n- PPF: 15-year lock-in, ~7% returns\n- NSC: 5-year lock-in, ~7% returns\n- FD: 5-year lock-in, ~6-7% returns\n- ELSS: 3-year lock-in, ~12-15% returns (historical)\n\nTax on ELSS Returns:\n- Long-term capital gains (LTCG) above ₹1 lakh taxed at 10%\n- No indexation benefit available\n- Dividends taxed as per income tax slab\n\nBest Practices:\n- Start SIP early in the financial year\n- Don't redeem immediately after lock-in\n- Choose growth option for wealth creation\n- Review fund performance annually")
                .category("Tax Planning")
                .author(advisor)
                .tags("ELSS,tax,Section 80C,tax planning")
                .published(true)
                .build());

        contentRepository.save(EducationalContent.builder()
                .title("How to Select the Right Mutual Fund")
                .content("Selecting the right mutual fund requires careful analysis of multiple factors.\n\nStep 1: Define Your Investment Goals\n- Short-term (< 3 years): Liquid or ultra-short duration funds\n- Medium-term (3-5 years): Hybrid or balanced funds\n- Long-term (> 5 years): Equity funds\n\nStep 2: Assess Your Risk Tolerance\n- Conservative: Debt funds, liquid funds\n- Moderate: Balanced funds, large-cap funds\n- Aggressive: Mid-cap, small-cap, sectoral funds\n\nStep 3: Evaluate Fund Performance\n- Compare with benchmark index\n- Check consistency over 3, 5, and 10-year periods\n- Look at risk-adjusted returns (Sharpe ratio)\n\nStep 4: Check Fund House Credentials\n- Track record and reputation\n- AUM (Assets Under Management)\n- Fund manager experience\n\nStep 5: Review Costs\n- Expense ratio (lower is better)\n- Exit load charges\n- Compare with category average\n\nStep 6: Read the Fund Factsheet\n- Portfolio composition\n- Sector allocation\n- Top holdings\n- Monthly performance update")
                .category("Fund Selection")
                .author(advisor)
                .tags("fund selection,portfolio,analysis,investment")
                .published(true)
                .build());
    }

    private void seedInvestments() {
        User investor1 = userRepository.findByUsername("investor1").orElse(null);
        User investor2 = userRepository.findByUsername("investor2").orElse(null);

        MutualFund fund1 = mutualFundRepository.findById(1L).orElse(null);
        MutualFund fund2 = mutualFundRepository.findById(2L).orElse(null);
        MutualFund fund3 = mutualFundRepository.findById(3L).orElse(null);
        MutualFund fund4 = mutualFundRepository.findById(4L).orElse(null);

        if (investor1 != null && fund1 != null) {
            investmentRepository.save(Investment.builder()
                    .user(investor1)
                    .mutualFund(fund1)
                    .amount(50000.0)
                    .units(50000.0 / fund1.getNavValue())
                    .investmentDate(LocalDate.of(2024, 1, 15))
                    .investmentType(InvestmentType.LUMPSUM)
                    .status(InvestmentStatus.ACTIVE)
                    .currentValue(57500.0)
                    .build());
        }

        if (investor1 != null && fund2 != null) {
            investmentRepository.save(Investment.builder()
                    .user(investor1)
                    .mutualFund(fund2)
                    .amount(25000.0)
                    .units(25000.0 / fund2.getNavValue())
                    .investmentDate(LocalDate.of(2024, 3, 1))
                    .investmentType(InvestmentType.SIP)
                    .status(InvestmentStatus.ACTIVE)
                    .currentValue(29800.0)
                    .sipAmount(5000.0)
                    .build());
        }

        if (investor1 != null && fund4 != null) {
            investmentRepository.save(Investment.builder()
                    .user(investor1)
                    .mutualFund(fund4)
                    .amount(15000.0)
                    .units(15000.0 / fund4.getNavValue())
                    .investmentDate(LocalDate.of(2024, 6, 10))
                    .investmentType(InvestmentType.SIP)
                    .status(InvestmentStatus.ACTIVE)
                    .currentValue(17200.0)
                    .sipAmount(2500.0)
                    .build());
        }

        if (investor2 != null && fund3 != null) {
            investmentRepository.save(Investment.builder()
                    .user(investor2)
                    .mutualFund(fund3)
                    .amount(100000.0)
                    .units(100000.0 / fund3.getNavValue())
                    .investmentDate(LocalDate.of(2023, 11, 20))
                    .investmentType(InvestmentType.LUMPSUM)
                    .status(InvestmentStatus.ACTIVE)
                    .currentValue(112000.0)
                    .build());
        }

        if (investor2 != null && fund1 != null) {
            investmentRepository.save(Investment.builder()
                    .user(investor2)
                    .mutualFund(fund1)
                    .amount(30000.0)
                    .units(30000.0 / fund1.getNavValue())
                    .investmentDate(LocalDate.of(2024, 2, 5))
                    .investmentType(InvestmentType.SIP)
                    .status(InvestmentStatus.ACTIVE)
                    .currentValue(34500.0)
                    .sipAmount(5000.0)
                    .build());
        }
    }

    private void seedReports() {
        User analyst = userRepository.findByUsername("analyst1").orElse(null);

        if (analyst != null) {
            reportRepository.save(Report.builder()
                    .title("Q4 2024 Market Performance Report")
                    .description("Comprehensive analysis of mutual fund performance across categories for Q4 2024")
                    .reportType("QUARTERLY_PERFORMANCE")
                    .generatedBy(analyst)
                    .reportData("{\"totalFunds\":10,\"avgReturn1Y\":17.4,\"topCategory\":\"EQUITY\",\"topFund\":\"Kotak Small Cap Fund\",\"avgExpenseRatio\":1.26,\"totalAUM\":278250}")
                    .build());

            reportRepository.save(Report.builder()
                    .title("Investor Behavior Analysis - 2024")
                    .description("Analysis of investment patterns and risk preferences among platform investors")
                    .reportType("INVESTOR_BEHAVIOR")
                    .generatedBy(analyst)
                    .reportData("{\"totalInvestors\":2,\"avgInvestment\":44000,\"preferredType\":\"SIP\",\"riskDistribution\":{\"LOW\":10,\"MODERATE\":40,\"HIGH\":35,\"VERY_HIGH\":15},\"topCategory\":\"EQUITY\"}")
                    .build());

            reportRepository.save(Report.builder()
                    .title("Fund Category Comparison Report")
                    .description("Detailed comparison of returns and risk across different mutual fund categories")
                    .reportType("CATEGORY_COMPARISON")
                    .generatedBy(analyst)
                    .reportData("{\"categories\":{\"EQUITY\":{\"avgReturn\":22.1,\"avgRisk\":\"HIGH\"},\"DEBT\":{\"avgReturn\":7.9,\"avgRisk\":\"LOW\"},\"HYBRID\":{\"avgReturn\":11.2,\"avgRisk\":\"MODERATE\"},\"INDEX\":{\"avgReturn\":14.5,\"avgRisk\":\"MODERATE\"},\"ELSS\":{\"avgReturn\":17.5,\"avgRisk\":\"HIGH\"}}}")
                    .build());
        }
    }
}
