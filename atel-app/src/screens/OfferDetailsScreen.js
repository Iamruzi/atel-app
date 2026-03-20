import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { atelAPI } from '../api';

export default function OfferDetailsScreen({ route, navigation }) {
  const { offerId } = route.params;
  const [loading, setLoading] = useState(true);
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    loadOfferDetails();
  }, [offerId]);

  const loadOfferDetails = async () => {
    try {
      setLoading(true);
      const data = await atelAPI.getOfferDetails(offerId);
      setOffer(data);
    } catch (error) {
      console.error('Failed to load offer details:', error);
      Alert.alert('Error', 'Failed to load offer details');
    } finally {
      setLoading(false);
    }
  };

  const handleBuyOffer = () => {
    Alert.alert(
      'Confirm Purchase',
      `Buy "${offer.title}" for $${offer.price}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Buy',
          onPress: async () => {
            try {
              await atelAPI.buyOffer(offerId, {});
              Alert.alert('Success', 'Order created successfully');
              navigation.navigate('Orders');
            } catch (error) {
              Alert.alert('Error', 'Failed to create order');
            }
          },
        },
      ]
    );
  };

  const handleViewAgent = () => {
    if (offer.executorDid) {
      navigation.navigate('AgentDetails', { agentDid: offer.executorDid });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!offer) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Offer not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{offer.title}</Text>
        <Text style={styles.price}>${offer.price}</Text>
      </View>

      {/* Executor Info */}
      <TouchableOpacity style={styles.executorSection} onPress={handleViewAgent}>
        <View style={styles.executorInfo}>
          <Text style={styles.executorLabel}>Executor</Text>
          <Text style={styles.executorName}>{offer.executor || 'Unknown'}</Text>
        </View>
        <Text style={styles.viewAgentText}>View Agent →</Text>
      </TouchableOpacity>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>⭐ {offer.rating || 'N/A'}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{offer.completedOrders || 0}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{offer.responseTime || 'N/A'}</Text>
          <Text style={styles.statLabel}>Response</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          {offer.description || 'No description available'}
        </Text>
      </View>

      {/* Capability */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Capability</Text>
        <View style={styles.capabilityTag}>
          <Text style={styles.capabilityText}>{offer.capability}</Text>
        </View>
      </View>

      {/* Requirements */}
      {offer.requirements && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          <Text style={styles.requirementsText}>{offer.requirements}</Text>
        </View>
      )}

      {/* Delivery Time */}
      {offer.deliveryTime && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Time</Text>
          <Text style={styles.deliveryText}>⏱️ {offer.deliveryTime}</Text>
        </View>
      )}

      {/* Action Button */}
      <TouchableOpacity style={styles.buyButton} onPress={handleBuyOffer}>
        <Text style={styles.buyButtonText}>Buy Now - ${offer.price}</Text>
      </TouchableOpacity>
    </ScrollView>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  errorText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  header: {
    backgroundColor: '#FFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  executorSection: {
    backgroundColor: '#FFF',
    padding: 20,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  executorInfo: {
    flex: 1,
  },
  executorLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  executorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  viewAgentText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 20,
    marginTop: 10,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  section: {
    backgroundColor: '#FFF',
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
  },
  capabilityTag: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  capabilityText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '600',
  },
  requirementsText: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
  },
  deliveryText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  buyButton: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
