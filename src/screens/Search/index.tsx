import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, FlatList, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';
import { Search, Mic, Camera, ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import WebView from 'react-native-webview';
import Page from '../../components/Page';
import CustomText from '../../components/custom-text';
import RecentSearchItem from '../../components/recent-search-item';
import { theme } from '../../config/theme';

const { width, height } = Dimensions.get('screen');

interface SearchItem {
  id: number;
  search: string;
  history: boolean;
}

const recentSearches: SearchItem[] = [
  { id: 1, search: "wishlink", history: true },
  { id: 2, search: "image to pdf", history: true },
  { id: 3, search: "pdf to image", history: true },
  { id: 4, search: "how to make a wishlink", history: true },
  { id: 5, search: "music to text", history: true },
];

function SearchModal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchItem[]>(recentSearches);
  const [searchUrl, setSearchUrl] = useState('https://www.google.com');
  const webViewRef = useRef<WebView>(null);
  const navigation = useNavigation();

  const fetchSuggestions = async (query: string) => {
    if (query.trim() === '') {
      setSuggestions(recentSearches);
      return;
    }
    try {
      const response = await fetch(
        `http://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSuggestions(data[1]?.map((suggestion: string, index: number) => ({ 
        id: index + 10, 
        search: suggestion, 
        history: false 
      })));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions(recentSearches);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() !== '') {
      setSearchUrl(`https://www.google.com/search?q=${encodeURIComponent(query)}&hl=dark`);
    } else {
      setSearchUrl('https://www.google.com');
    }
  };

  if (searchQuery) {
    return <WebView source={{ uri: searchUrl }} />;
  }

  return (
    <Page>
      <Animated.View style={styles.searchBar}>
        <View style={styles.searchBarContent}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            activeOpacity={0.9}
          >
            <ChevronLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9} style={styles.inputContainer}>
            <TextInput
              placeholderTextColor={theme.colors.textSecondary}
              onChangeText={fetchSuggestions}
              placeholder="Search or type URL"
              style={styles.input}
            />
          </TouchableOpacity>
          <Mic size={20} color={theme.colors.text} />
          <TouchableOpacity onPress={() => navigation.navigate('CameraScreen' as never)}>
            <Camera size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </Animated.View>
      
      <View style={styles.headerContainer}>
        <CustomText 
          variant="muted" 
          text="Recent searches" 
          style={styles.headerText} 
        />
        <CustomText 
          variant="muted" 
          text="MANAGE HISTORY" 
          style={styles.headerText} 
        />
      </View>
      
      <FlatList
        data={suggestions}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <RecentSearchItem 
            handlePress={() => handleSearch(item.search)} 
            search={item.search} 
            history={item.history}
          />
        )}
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
    backgroundColor: theme.colors.secondary,
    borderRadius: 40,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  searchBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    color: theme.colors.text,
    fontSize: 18,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  headerText: {
    fontSize: 16,
    color: theme.colors.secondaryLight,
    fontWeight: 'regular',
  },
  listContainer: {
    marginTop: 30,
    rowGap: 16,
  },
});

export default SearchModal;
