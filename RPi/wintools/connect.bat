@echo off
ssh-keygen -R pi5.local
ssh -o StrictHostKeyChecking=no pi5@pi5.local