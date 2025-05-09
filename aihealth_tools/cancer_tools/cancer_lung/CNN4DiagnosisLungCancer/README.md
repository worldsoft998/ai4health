# Convolutional Neural Network (CNN) / Deep Learning Algorithms based Diagnosis for Lung Cancer

Convolutional Neural Network (CNN) Algorithms were developed to detect the cancerous nodules. Images of benign and malignant nodules were used  for the CNN Algorithms. The CNNs were established, trained, and validated using data set. Model evaluation showed that the CNN model is able to detect cancerous nodules with 68.84 % accuracy.

## Model architecture

Convolutional Neural Network (CNN)   are used to detect  patterns in an image. This is done by convoluting over an image and detecting for patterns . The network can detect lines and corners in the few front layers of CNN. With the help of  the neural network ,   these patterns can be then transfered down to next layers and more complex patterns can be identified. This property shows that CNNs are very useful  in detecting objects in images . 

- CNN model is composed of the following main layers :-
      1.	Convolutional layer
      2.	Pooling layer
      3.	Fully connected layer

- Conv2d (). Construct a two-dimensional convolutional layer with the number of filters, filter kernel size, padding, and activation function as arguments.
- max_pooling2d (). Construct a two-dimensional pooling layer using the max-pooling algorithm.
- Dense (). Construct a dense layer with the hidden layers and units.

## Training
For training the model the dataset were taken from train set and validation set are also validated for the model.

The training is performed for 30 epochs.

During the training  losses wered monitored.

Loss function sparse_categorical_crossentropy was used.

Crossentropy loss between the labels and predictions was computed.

The crossentropy loss function was used when there are two or more label classes. 


## Conclusion

Modified CNN model was used and  testing accuracy of approximately 70% was obtained. Sensitivity of 0.7169 was achieved as well.

