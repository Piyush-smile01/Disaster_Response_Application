import 'dart:io';
import 'package:flutter/material.dart';
import '../services/sos_service.dart';

class SosScreen extends StatefulWidget {
  @override
  _SosScreenState createState() => _SosScreenState();
}

class _SosScreenState extends State<SosScreen> {
  final TextEditingController _messageController = TextEditingController();
  int peopleAffected = 0;
  Map<String, dynamic>? result;

  void sendSOS() async {
    final response = await SosService.sendTextSOS(
      message: _messageController.text,
      peopleAffected: peopleAffected,
    );

    setState(() {
      result = response;
    });
  }

  Color priorityColor(int p) {
    if (p == 1) return Colors.red;
    if (p == 2) return Colors.orange;
    return Colors.green;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Disaster SOS")),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: _messageController,
              decoration: InputDecoration(labelText: "Describe situation"),
            ),
            TextField(
              keyboardType: TextInputType.number,
              decoration: InputDecoration(labelText: "People affected"),
              onChanged: (v) => peopleAffected = int.tryParse(v) ?? 0,
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: sendSOS,
              child: Text("Send SOS"),
            ),
            SizedBox(height: 20),
            if (result != null)
              Card(
                child: ListTile(
                  title: Text(
                    "Priority: ${result!['priority']}",
                    style: TextStyle(
                      color: priorityColor(result!['priority']),
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  subtitle: Text(
                    "Disaster: ${result!['disasterType']}\n"
                    "Confidence: ${result!['confidence']}",
                  ),
                ),
              )
          ],
        ),
      ),
    );
  }
}
