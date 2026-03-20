import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { atelAPI } from '../api';
import { searchOffers, debounce } from '../utils/search';

export default function MarketplaceScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    loadOffers();
  }, []);

  // 实时搜索
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query || query.trim() === '') {
        setFilteredOffers(offers);
        setSearching(false);
        return;
      }

      try {
        setSearching(true);
        const results = await searchOffers(query);
        setFilteredOffers(results);
      } catch (error) {
        console.error('Search failed:', error);
        // 本地过滤作为降级方案
        const filtered = offers.filter(
          (offer) =>
            offer.title.toLowerCase().includes(query.toLowerCase()) ||
            offer.capability.toLowerCase().includes(query.toLowerCase()) ||
            offer.executor.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredOffers(filtered);
      } finally {
        setSearching(false);
      }
    }, 300),
    [offers]
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const loadOffers = async () => {
    try {
      setLoading(true);
      const data = await atelAPI.getOffers();
      setOffers(data.offers || []);
      setFilteredOffers(data.offers || []);
    } catch (error) {
      console.error('Failed to load offers:', error);
      // 模拟数据作为降级方案
      const mockOffers = [
        {
          id: '1',
          title: 'AI Research Assistant',
          capability: 'research',
          price: 5,
          executor: 'Agent Alpha',
          executorDid: 'did:atel:agent:alpha',
          rating: 4.8,
          completedOrders: 156,
        },
        {
          id: '2',
          title: 'Code Review Service',
          capability: 'code-review',
          price: 10,
          executor: 'Agent Beta',
          executorDid: 'did:atel:agent:beta',
          rating: 4.9,
          completedOrders: 89,
        },
        {
          id: '3',
          title: 'Data Analysis',
          capability: 'data-analysis',
          price: 8,
          executor: 'Agent Gamma',
          executorDid: 'did:atel:agent:gamma',
          rating: 4.7,
          completedOrders: 234,
        },
      ];
      setOffers(mockOffers);
      setFilteredOffers(mockOffers);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOffers();
    setRefreshing(false);
  };

  const renderOfferCard = ({ item }) => (
    <TouchableOpacity
      style={styles.offerCard}
      onPress={() => {
        navigation.navigate('OfferDetails', { offerId: item.id });
      }}
    >
      <View style={styles.offerHeader}>
        <Text style={styles.offerTitle}>{item.title}</Text>
        <Text style={styles.offerPrice}>${item.price}</Text>
      </View>
      
      <Text style={styles.offerCapability}>📌 {item.capability}</Text>
      <Text style={styles.offerExecutor}>👤 {item.executor}</Text>
      
      <View style={styles.offerFooter}>
        <Text style={styles.offerRating}>⭐ {item.rating}</Text>
        <Text style={styles.offerOrders}>{item.completedOrders} orders</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search offers..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searching && (
          <ActivityIndicator
            style={styles.searchIndicator}
            size="small"
            color="#007AFF"
          />
        )}
      </View>

      {/* Offers List */}
      <FlatList
        data={filteredOffers}
        renderItem={renderOfferCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery ? 'No offers found' : 'No offers available'}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  searchIndicator: {
    marginLeft: 10,
  },
  listContainer: {
    padding: 15,
  },
  offerCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  offerPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  offerCapability: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 5,
  },
  offerExecutor: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 10,
  },
  offerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F8F8F8',
  },
  offerRating: {
    fontSize: 14,
    color: '#000',
  },
  offerOrders: {
    fontSize: 14,
    color: '#8E8E93',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#8E8E93',
  },
});
