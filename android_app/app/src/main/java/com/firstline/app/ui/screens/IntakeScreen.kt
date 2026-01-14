package com.firstline.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Mic
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun IntakeScreen(onNavigateToFollowUp: () -> Unit) {
    var age by remember { mutableStateOf("") }
    var symptoms by remember { mutableStateOf("") }
    var duration by remember { mutableStateOf("") }
    var consent by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .verticalScroll(rememberScrollState())
    ) {
        Text("Patient Intake", style = MaterialTheme.typography.headlineMedium)
        Spacer(modifier = Modifier.height(16.dp))

        OutlinedTextField(
            value = age,
            onValueChange = { age = it },
            label = { Text("Age") },
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(modifier = Modifier.height(8.dp))

        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
             Text("Sex: ")
             // Simple toggle or segmented button would go here
        }
        
        Spacer(modifier = Modifier.height(16.dp))

        OutlinedTextField(
            value = symptoms,
            onValueChange = { symptoms = it },
            label = { Text("Symptoms / Chief Complaint") },
            modifier = Modifier.fillMaxWidth().height(150.dp),
            trailingIcon = {
                IconButton(onClick = { /* MedASR trigger */ }) {
                    Icon(Icons.Default.Mic, contentDescription = "Voice Input")
                }
            }
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        OutlinedTextField(
            value = duration,
            onValueChange = { duration = it },
            label = { Text("Duration (Days)") },
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(24.dp))

        Row(verticalAlignment = androidx.compose.ui.Alignment.CenterVertically) {
            Checkbox(checked = consent, onCheckedChange = { consent = it })
            Text("Patient gives consent for triage support", fontSize = 14.sp)
        }

        Spacer(modifier = Modifier.height(32.dp))

        Button(
            onClick = onNavigateToFollowUp,
            enabled = consent && age.isNotEmpty() && symptoms.isNotEmpty(),
            modifier = Modifier.fillMaxWidth().height(56.dp)
        ) {
            Text("CONTINUE TO FOLLOW-UP")
        }
    }
}
