---
title: Troubleshooting Guide for Node Operators  
sidebar_label: Node Troubleshooting  
description: A detailed guide for diagnosing and resolving common issues for Base node operators 
---

# Troubleshooting Guide for Base Node Operators

## Introduction

This guide is designed to help Base node operators diagnose and resolve common issues encountered during node operation. It provides typical problem scenarios along with step-by-step instructions for addressing them.

## Common Issues and Solutions

### 1. Synchronization Issues

#### Symptoms
- The node lags behind the current block
- Slow synchronization
- Synchronization stops

#### Solutions
1. Check your internet connection.
2. Ensure you have sufficient disk space.
3. Verify system requirements:
   - Minimum 16 GB RAM
   - 8-core CPU
   - SSD with enough free space.
4. Restart the node with the flag `--syncmode "full"`.

### 2. Performance Issues

#### Symptoms
- High CPU usage
- Slow transaction processing
- High memory consumption

#### Solutions
1. Monitor resources:
   ```bash
   htop  # View CPU and memory usage
   df -h # Check disk space
   ```
2. Optimize configuration:
   - Increase the cache size in the configuration
   - Adjust Garbage Collection (GC) settings
3. Check and upgrade hardware if necessary.

### 3. Network Issues

#### Symptoms
- Difficulty connecting to peers
- Frequent disconnections
- P2P errors

#### Solutions
1. Check firewall settings:
   ```bash
   sudo ufw status
   ```
2. Ensure required ports are open:
   - Port 30303 (TCP/UDP) for P2P
   - Port 8545 for RPC (if used)
3. Check peer connection:
   ```javascript
   admin.peers.length // Should be greater than 0
   ```

### 4. Consensus Issues

#### Symptoms
- Blockchain discrepancies
- Block validation errors
- Forks

#### Solutions
1. Verify the client version:
   ```bash
   geth version
   ```
2. Ensure you're using the latest stable version.
3. Check logs for consensus errors.
4. If needed, perform a full resynchronization.

## Diagnostic Tools

### Log Analysis
```bash
# View logs in real time
tail -f /path/to/node/logs/geth.log

# Search for errors in logs
grep "ERROR" /path/to/node/logs/geth.log
```

### Metric Monitoring
1. Set up Prometheus for metrics collection.
2. Use Grafana for visualization
3. Key metrics to monitor:
   - Block synchronization
   - Resource usage
   - Network activity
   - Transaction processing time

## Preventive Maintenance

1. Regularly check for client updates.
2. Perform data backups.
3. Monitor disk space usage.
4. Clean up old data periodically.

## Support Contacts

If you encounter a problem that you cannot solve on your own:

1. Visit the [Base Community Discord](https://discord.gg/buildonbase)
2. Create an issue on [GitHub](https://github.com/base-org/node)
3. Refer to the [Base Documentation](https://docs.base.org)

## Conclusion

This guide will be updated regularly based on feedback from node operators and new problem scenarios. If you have suggestions for improving this guide, please create an issue or pull request in the repository.
