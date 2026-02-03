import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      common: {
        loading: 'Loading...',
        error: 'Error',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        create: 'Create',
        search: 'Search',
        noData: 'No data available',
      },
      nav: {
        dashboard: 'Dashboard',
        projects: 'Projects',
        assets: 'Assets',
        settings: 'Settings',
        logout: 'Logout',
      },
      auth: {
        login: 'Login',
        register: 'Register',
        email: 'Email',
        password: 'Password',
        firstName: 'First Name',
        lastName: 'Last Name',
        loginButton: 'Sign In',
        registerButton: 'Sign Up',
        noAccount: "Don't have an account?",
        hasAccount: 'Already have an account?',
      },
      projects: {
        title: 'Projects',
        newProject: 'New Project',
        name: 'Name',
        description: 'Description',
        status: 'Status',
        createdAt: 'Created',
        updatedAt: 'Updated',
        deleteConfirm: 'Are you sure you want to delete this project?',
      },
      assets: {
        title: 'Assets',
        newAsset: 'New Asset',
        name: 'Name',
        type: 'Type',
        rulesheet: 'Rulesheet',
        ruleflow: 'Ruleflow',
        vocabulary: 'Vocabulary',
        decisionservice: 'Decision Service',
      },
      dashboard: {
        title: 'Dashboard',
        welcome: 'Welcome to Corticon Rules Management',
        totalProjects: 'Total Projects',
        totalAssets: 'Total Assets',
        recentProjects: 'Recent Projects',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
