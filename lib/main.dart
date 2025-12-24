// ignore_for_file: unused_import

import 'package:flutter/material.dart';
import 'screens/report_disaster_screen.dart';
import 'screens/resource_request_screen.dart';
import 'screens/volunteer_screen.dart';
import 'screens/register_screen.dart';
// import 'screens/map_screen.dart';

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
      body: Container(
  width: double.infinity,
  height: double.infinity,
  decoration: const BoxDecoration(
    gradient: LinearGradient(
      colors: [
        Color(0xFF0F2027),
        Color(0xFF203A43),
        Color(0xFF2C5364),
      ],
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
    ),
  ),
  child: SingleChildScrollView(
    padding: const EdgeInsets.all(20),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildHeader(),
        const SizedBox(height: 30),
        _buildButtons(context),
        const SizedBox(height: 30),
        _buildActionCards(context),
      ],
    ),
  ),
      ),
    );
  }
}
Widget _buildHeader() {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      Text(
        'Disaster Management',
        style: TextStyle(
          color: Colors.greenAccent,
          fontSize: 28,
          fontWeight: FontWeight.bold,
        ),
      ),
      SizedBox(height: 10),
      Text(
        'Innovate. Prepare. Respond.\nTechnology-driven solutions to manage disasters.',
        style: TextStyle(
          color: Colors.white70,
          fontSize: 16,
        ),
      ),
    ],
  );
}
Widget _buildButtons(BuildContext context) {
  return Row(
    children: [
      ElevatedButton(
        onPressed: () {
          Navigator .push(
            context,
            MaterialPageRoute(builder: (context) => const RegisterScreen(),
            ),
          );
        },
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.green,
        ),
        child: const Text('Register Now'),
      ),
      const SizedBox(width: 15),
      OutlinedButton(
        onPressed: () {},
        style: OutlinedButton.styleFrom(
          foregroundColor: Colors.white,
          side: const BorderSide(color: Colors.white),
        ),
        child: const Text('Learn More'),
      ),
    ],
  );
}
Widget _buildActionCards(BuildContext context) {
  return Column(
    children:  [
      FeatureCard(
  title: 'Report a Disaster',
  subtitle: 'Notify authorities with location',
  icon: Icons.warning,
  color: Colors.red,
  onTap: () {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => const ReportDisasterScreen(),
      ),
    );
  },
),
      SizedBox(height: 16),
      FeatureCard(
  title: 'Request Resources',
  subtitle: 'Food, water, shelter, medical aid',
  icon: Icons.medical_services,
  color: Colors.orange,
  onTap: () {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => const ResourceRequestScreen(),
      ),
    );
  },
),
      SizedBox(height: 16),
     FeatureCard(
  title: 'Volunteer for Help',
  subtitle: 'Join rescue or support teams',
  icon: Icons.volunteer_activism,
  color: Colors.green,
  onTap: () {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => const VolunteerScreen(),
      ),
    );
  },
),
    ],
  );
}
class FeatureCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final IconData icon;
  final Color color;
  final VoidCallback onTap;

  const FeatureCard({
    super.key,
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.color,
    required this.onTap,
  });

@override
Widget build(BuildContext context) {
  return InkWell(
    onTap: onTap,
    child: Card(
      elevation: 6,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            Icon(icon, color: color, size: 40),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      color: Colors.black,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 5),
                  Text(
                    subtitle,
                    style: const TextStyle(
                      color: Colors.black,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    ),
    );
  }
}
