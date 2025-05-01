export const onboardingData = [
    {
      icon: require('../../assets/images/account_box.png'),
      title: 'Owner details',
      description: 'Includes name, address, contact, and identity proof.',
      route: 'OwnerDetails',
      key: 'owner', 
    },
    {
      icon: require('../../assets/images/cases.png'),
      title: 'Business details',
      description: 'Includes business type, contact, address, proof of business, etc.',
      route: 'BusinessDetails',
      key: 'business',
    },
    {
      icon: require('../../assets/images/store.png'),
      title: 'Trading information',
      description: 'Includes trading name, address, and related details.',
      route: 'TradingInfo',
      key: 'trading',
    },
    {
      icon: require('../../assets/images/account_balance.png'),
      title: 'Bank details',
      description: 'Includes account number, bank name, and related information.',
      route: 'BankDetails',
      key: 'bank',
    },
  ];

  

export const businessOptions = [
    {
      id: 'sole_trader',
      icon: require('../../assets/images/location_away.png'),
      label: 'Sole Trader',
      description: 'A self-employed individual running a business.',
    },
    {
      id: 'limited_llp',
      icon: require('../../assets/images/storefront.png'),
      label: 'Limited/LLP',
      description: 'A registered company with limited liability protection.',
    },
    {
      id: 'partnership',
      label: 'Partnership',
      description: 'A business owned and operated by two or more individuals.',
      icon: require('../../assets/images/handshake.png'),
    },
    {
      id: 'others',
      label: 'Others',
      description: 'Any business type that doesn’t fall into the above categories.',
      icon: require('../../assets/images/domain.png'),
    },
  ];


  export const actions = [
    {
      id: "lastPayout",
      label: "Last payout",
      icon: require("../../assets/images/card_travel.png"),
    },
    {
      id: "alerts",
      label: "Alerts",
      icon: require("../../assets/images/notifications_unread.png"),
    },
    {
      id: "callStatus",
      label: "Call status",
      icon: require("../../assets/images/perm_phone_msg.png"),
    },
    {
      id: "recentPayments",
      label: "Recent Payments",
      icon: require("../../assets/images/credit_card_clock.png"),
    },
  ];


  export const organisationOptions = [
    { value: 'association', label: 'Association Incorporated' },
    { value: 'governmental', label: 'Governmental Organisation' },
    { value: 'nonprofit', label: 'Non Profit' },
    { value: 'partnership', label: 'Partnership Incorporated' },
    { value: 'private', label: 'Private Company' },
  ];