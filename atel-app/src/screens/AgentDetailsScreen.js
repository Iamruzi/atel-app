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

export default function AgentDetailsScreen({ route, navigation }) {
  const { agentDid } = route.params;
  const [loading, setLoading] = useState(true);
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    loadAgentDetails();
  }, [agentDid]);

  const loadAgentDetails = async () => {
    try {
      setLoading(true);
      const data = await atelAPI.getAgentDetails(agentDid);
      setAgent(data);
    } catch (error) {
      console.error('Failed to load agent details:', error);
      Alert.alert('Error', 'Failed to load agent details');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrder = () => {
    navigation.navigate('CreateOrder', { agentDid: agent.did });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!agent) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Agent not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{agent.name || 'Unknown Agent'}</Text>
        <Text style={styles.did}>DID: {agent.did}</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>⭐ {agent.rating || 'N/A'}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{agent.completedOrders || 0}</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{agent.successRate || 'N/A'}%</Text>
          <Text style={styles.statLabel}>Success</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          {agent.description || 'No description available'}
        </Text>
      </View>

      {/* Capabilities */}
      {agent.capabilities && agent.capabilities.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Capabilities</Text>
          <View style={styles.capabilitiesContainer}>
            {agent.capabilities.map((cap, index) => (
              <View key={index} style={styles.capabilityTag}>
                <Text style={styles.capabilityText}>{cap}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Pricing */}
      {agent.pricing && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pricing</Text>
          <Text style={styles.price}>${agent.pricing.basePrice || 'N/A'} per task</Text>
        </View>
      )}

      {/* Contact */}
      {agent.contact && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <Text style={styles.contactText}>{agent.contact}</Text>
        </View>
      )}

      {/* Action Button */}
      <TouchableOpacity style={styles.actionButton} onPress={handleCreateOrder}>
        <Text style={styles.actionButtonText}>Create Order</Text>
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
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  did: {
    fontSize: 12,
    color: '#8E8E93',
    fontFamily: 'monospace',
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
    fontSize: 20,
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
  capabilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  capabilityTag: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  capabilityText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  contactText: {
    fontSize: 14,
    color: '#007AFF',
  },
  actionButton: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
