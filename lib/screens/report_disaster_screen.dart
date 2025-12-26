import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../utils/location_helper.dart';

class ReportDisasterScreen extends StatefulWidget {
  const ReportDisasterScreen({super.key});

  @override
  State<ReportDisasterScreen> createState() => _ReportDisasterScreenState();
}

class _ReportDisasterScreenState extends State<ReportDisasterScreen> {
  final TextEditingController typeController = TextEditingController();
  final TextEditingController descriptionController = TextEditingController();
  final TextEditingController peopleController = TextEditingController();

  bool isLoading = false;

  Future<void> submitReport() async {
    setState(() => isLoading = true);

    try {
      // 1️⃣ Get real user location
      final position = await getCurrentLocation();

      // 2️⃣ Call backend API
      final result = await ApiService.reportDisaster(
        message:
            "${typeController.text} - ${descriptionController.text}",
        location: "${position.latitude},${position.longitude}",
        peopleAffected: int.tryParse(peopleController.text) ?? 0,
      );

      setState(() => isLoading = false);

      if (!mounted) return;

      if (result != null) {
        // 3️⃣ Show prediction result
        showDialog(
          context: context,
          builder: (_) => AlertDialog(
            title: const Text("Prediction Result"),
            content: Text(
              "Disaster Type: ${result['disasterType']}\n"
              "Severity: ${result['severity']}\n"
              "Priority: ${result['priority']}\n\n"
              "Location:\n${position.latitude}, ${position.longitude}",
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: const Text("OK"),
              ),
            ],
          ),
        );

        // 4️⃣ Clear fields
        typeController.clear();
        descriptionController.clear();
        peopleController.clear();
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Failed to submit report")),
        );
      }
    } catch (e) {
      setState(() => isLoading = false);

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Error: $e")),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Report Disaster")),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: typeController,
              decoration: const InputDecoration(
                labelText: "Disaster Type (e.g. Flood)",
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: descriptionController,
              maxLines: 3,
              decoration: const InputDecoration(
                labelText: "Description",
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: peopleController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: "People Affected",
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: isLoading ? null : submitReport,
              child: isLoading
                  ? const CircularProgressIndicator(color: Colors.white)
                  : const Text("Submit Report"),
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
