import 'package:flutter/material.dart';

void main() {
  runApp(const DisasterApp());
}

class DisasterApp extends StatelessWidget {
  const DisasterApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Disaster Response',
      theme: ThemeData(
        primarySwatch: Colors.red,
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Disaster Response'),
        centerTitle: true,
      ),
      body: Padding(
  padding: const EdgeInsets.all(16),
  child: Column(
    crossAxisAlignment: CrossAxisAlignment.stretch,
    children: [
      ActionCard(
        icon: Icons.warning,
        title: 'Report Disaster',
        color: Colors.red,
      ),
      const SizedBox(height: 16),
      ActionCard(
        icon: Icons.volunteer_activism,
        title: 'Volunteer',
        color: Colors.green,
      ),
      const SizedBox(height: 16),
      ActionCard(
        icon: Icons.map,
        title: 'View Affected Areas',
        color: Colors.blue,
      ),
    ],
  ),
),
      
    );
  }
}
class ActionCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final Color color;

  const ActionCard({
    super.key,
    required this.icon,
    required this.title,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
  onTap: () {
    // navigation will come here
  },
  child: Card(
    elevation: 5,
    child: Padding(
        padding: const EdgeInsets.all(20),
        child: Row(
          children: [
            Icon(icon, size: 40, color: color),
            const SizedBox(width: 20),
            Text(
              title,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
  ),
    );
  }
}