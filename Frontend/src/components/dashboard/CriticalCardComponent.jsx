const CriticalComponentCard = ({ component, onClick }) => {
    const { background, text } = getResourceStatus(component.percent_over);
    
    const getUnit = (categoryName) => {
      const waterCategories = ['faucet', 'fountain', 'flush', 'water'];
      return waterCategories.includes(categoryName?.toLowerCase()) ? 'liters' : 'kWh';
    };
    
    return (
      <Card 
        className={`${background} cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border`}
        onClick={() => onClick(component)}
      >
        <CardContent className="p-4">
          <div className="flex flex-col items-center space-y-2">
            <div className={text}>
              {getCategoryIcon(component.category_name)}
            </div>
            <h4 className="font-semibold text-gray-900">{component.resource_id}</h4>
            <p className="text-sm text-gray-600">
              Usage: {component.usage} {getUnit(component.category_name)}
            </p>
            <p className={text}>
              {component.percent_over <= 0 
                ? `${Math.abs(component.percent_over).toFixed(1)}% Below Threshold`
                : `${component.percent_over.toFixed(1)}% Over Threshold`
              }
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };