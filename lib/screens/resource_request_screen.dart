import 'package:flutter/material.dart';

class ResourceRequestScreen extends StatelessWidget {
  const ResourceRequestScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Request Resources')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            DropdownButtonFormField(
              items: const [
                DropdownMenuItem(value: 'Food', child: Text('Food')),
                DropdownMenuItem(value: 'Medical', child: Text('Medical')),
                DropdownMenuItem(value: 'Shelter', child: Text('Shelter')),
              ],
              onChanged: (value) {},
              decoration: const InputDecoration(
                labelText: 'Resource Type',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {},
              child: const Text('Request'),
            ),
          ],
        ),
      ),
    );
  }
}

