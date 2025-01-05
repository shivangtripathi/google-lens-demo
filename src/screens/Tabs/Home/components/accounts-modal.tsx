import CustomText from '../../../../components/custom-text';
import { icons } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import auth, { signOut } from '@react-native-firebase/auth';
import { signOutWithGoogle } from '../../../../utils/auth';

const AccountsModal = ({hideModal}: {hideModal: () => void}) => {
  const [modalVisible, setModalVisible] = useState(true);

  const user = auth().currentUser;

  const handleHideModal = () => {
    setModalVisible(false);
    hideModal();
  }

  const renderIcon = (name: string) => {
    const Icon = icons[name];
    return <Icon size={16} color="#fff" />
  }

  const menuOptions = [
    { label: 'Manage your Google Account', icon: 'User' },
    { label: 'Turn on Incognito', icon: 'EyeOff' },
    { label: 'Search history', icon: 'Clock' },
    { label: 'Delete last 15 mins', icon: 'Trash' },
    { label: 'SafeSearch', icon: 'Shield' },
    { label: 'Saves and collections', icon: 'Bookmark' },
    { label: 'Results about you', icon: 'UserCheck' },
    { label: 'Passwords', icon: 'Key' },
    { label: 'Your profile', icon: 'CircleUser' },
    { label: 'Search personalisation', icon: 'Settings' },
    { label: 'Settings', icon: 'Settings' },
    { label: 'Help and feedback', icon: 'CircleHelp' },
    { label: 'Sign out', icon: 'LogOut' },
  ];
  
  const handleSignOut = async () => {
    await signOutWithGoogle();
    handleHideModal();
  }

  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleHideModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Header Section */}
            <View style={styles.header}>
              <Image
                source={{ uri: user?.photoURL }} // Replace with the user's profile picture URL
                style={styles.profileImage}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.nameText}>{user?.displayName}</Text>
                <Text style={styles.emailText}>{user?.email}</Text>
              </View>
              <TouchableOpacity onPress={handleHideModal}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Menu Options */}
            <ScrollView contentContainerStyle={styles.menu}>
              {menuOptions.map((item, index) => (
                <TouchableOpacity disabled={item.label !== 'Sign out'} onPress={handleSignOut} activeOpacity={0.8} key={index} style={styles.menuItem}>
                  {renderIcon(item.icon)}
                  <CustomText variant="text" text={item.label} style={styles.menuText} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  openButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
  },
  modalContent: {
    backgroundColor: '#202124',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  emailText: {
    fontSize: 14,
    color: '#aaa',
  },
  closeButton: {
    fontSize: 20,
    color: '#fff',
  },
  menu: {
    paddingBottom: 20,
  },
  menuItem: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  menuText: {
    fontSize: 14,
    color: '#fff',
  },
});

export default AccountsModal;
