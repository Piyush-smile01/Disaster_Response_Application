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
  final TextEditingController peopleController = TextEditingController();

  Future<void> submitReport() async {
    final result = await ApiService.reportDisaster(
      disasterType: typeController.text,
      description: descriptionController.text,
      peopleAffected: int.tryParse(peopleController.text) ?? 0,
      latitude: 28.61,
      longitude: 77.23,
    );

    if (result != null) {
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: const Text("Prediction Result"),
          content: Text(
            "Disaster Type: ${result['disasterType']}\n"
            "Severity: ${result['severity']}\n"
            "Priority: ${result['priority']}",
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text("OK"),
            ),
          ],
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Failed to submit report")),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Report Disaster")),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: typeController,
              decoration: const InputDecoration(
                labelText: "Disaster Type",
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: descriptionController,
              decoration: const InputDecoration(
                labelText: "Description",
                border: OutlineInputBorder(),
              ),
              maxLines: 3,
            ),
            const SizedBox(height: 12),
            TextField(
              controller: peopleController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: "People Affected",
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: submitReport,
              child: const Text("Submit Report"),
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
    peopleController.dispose();
    super.dispose();
  }
}
