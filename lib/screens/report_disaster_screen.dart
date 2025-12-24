import 'package:flutter/material.dart';
import '../services/api_service.dart';

class ReportDisasterScreen extends StatefulWidget {
  const ReportDisasterScreen({super.key});

  @override
  State<ReportDisasterScreen> createState() => _ReportDisasterScreenState();
}

class _ReportDisasterScreenState extends State<ReportDisasterScreen> {
  final TextEditingController typeController = TextEditingController();
  final TextEditingController descriptionController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Report Disaster')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: typeController,
              decoration: const InputDecoration(
                labelText: 'Disaster Type',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: descriptionController,
              decoration: const InputDecoration(
                labelText: 'Description',
                border: OutlineInputBorder(),
              ),
              maxLines: 3,
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () async {
                await ApiService.reportDisaster(
                  name: typeController.text,
                  description: descriptionController.text,
                  latitude: 28.61,
                  longitude: 77.23,
                );

                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Report Submitted')),
                );
              },
              child: const Text('Submit Report'),
            ),
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    typeController.dispose();
    descriptionController.dispose();
    super.dispose();
  }
}
